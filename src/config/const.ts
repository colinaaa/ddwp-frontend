const cardNames = ['狼人杀', '谁是卧底', '德国心脏病', '阿瓦隆', 'UNO'];

const nameToRoute = {
  UNO: '',
  狼人杀: '/pages/Werewolf/index',
  阿瓦隆: '',
  谁是卧底: '',
  德国心脏病: '',
};

const getRoute = (game: string): string => {
  return nameToRoute[game];
};

const isDev = process.env.NODE_ENV === '"development"';

// const GraphQLEndpoint = 'http://localhost:4000/graphql';
const GraphQLEndpoint = 'https://ddwp.outsiders.top/graphql';

// const WsEndpoint = 'ws://localhost:4000/ws';
const WsEndpoint = 'wss://ddwp.outsiders.top/ws';
export { cardNames, nameToRoute, getRoute, GraphQLEndpoint, WsEndpoint, isDev };
