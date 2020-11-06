import { MutationKey } from '@services/graphql';

const cardNames = ['狼人杀', '谁是卧底', '德国心脏病', '阿瓦隆', 'UNO', ''];

const nameToRoute: {
  [key: string]: string;
} = {
  UNO: '',
  狼人杀: '/pages/Werewolf/index',
  阿瓦隆: '',
  谁是卧底: '/pages/Undercover/index',
  德国心脏病: '',
};

const nameToJoinRoom: {
  [key: string]: MutationKey;
} = {
  UNO: 'WEREWOLF_JOIN_ROOM',
  狼人杀: 'WEREWOLF_JOIN_ROOM',
  阿瓦隆: 'WEREWOLF_JOIN_ROOM',
  谁是卧底: 'UNDERCOVER_JOIN_ROOM',
  德国心脏病: 'WEREWOLF_JOIN_ROOM',
};

const getRoute = (game: string): string => nameToRoute[game];

const getJoinRoom = (name: string): MutationKey => nameToJoinRoom[name];

const isDev = process.env.NODE_ENV === '"development"';

// const GraphQLEndpoint = 'http://localhost:4000/graphql';
const GraphQLEndpoint = 'https://ddwp.outsiders.top/graphql';

// const WsEndpoint = 'ws://localhost:4000/ws';
const WsEndpoint = 'wss://ddwp.outsiders.top/ws';
export { cardNames, nameToRoute, getRoute, getJoinRoom, GraphQLEndpoint, WsEndpoint, isDev };
