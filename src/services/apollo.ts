import { ApolloClient, InMemoryCache, HttpLink, split } from 'taro-apollo-client';
import { getMainDefinition } from 'taro-apollo-client/utilities';
import { WebSocketLink } from 'taro-apollo-client/link/ws';
import Taro from '@tarojs/taro';

import { GraphQLEndpoint, WsEndpoint } from '@config/const';

import WebSocket from './websocket';

type MethodT = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
type fetchT = typeof window.fetch;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const fetch: fetchT = async (url: string, options?) => {
  const { statusCode, errMsg, header, data } = await Taro.request({
    url,
    header: options && options.headers,
    data: options && options.body,
    method: options && (options.method as MethodT),
    dataType: 'text',
  });

  return {
    url,
    status: statusCode,
    statusText: errMsg,
    redirected: false,
    ok: statusCode === 200 && !data.errors,
    json: async () => JSON.parse(data),
    headers: header,
    body: data,
    text: async () => data,
  };
};

const wsLink = new WebSocketLink({
  uri: WsEndpoint,
  options: {
    reconnect: true,
  },
  webSocketImpl: WebSocket,
});

const httpLink = new HttpLink({ fetch, uri: GraphQLEndpoint });

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  ),
  cache: new InMemoryCache(),
});

export { client };

export default client;
