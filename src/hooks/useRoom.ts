import { useEffect } from '@tarojs/taro';
import { ApolloError, NetworkStatus } from 'taro-apollo-client';
import * as Sentry from 'sentry-miniapp';

import {
  werewolfRoomByNumber,
  werewolfRoomByNumberVariables,
  undercoverRoomByNumber,
  undercoverRoomByNumberVariables,
  Subscription,
  GameType,
} from '@services/graphql';
import { useQuery } from '@hooks/useQuery';

interface Player {
  position: number;
  role: string | null;
  isOut: boolean | null;
}

interface Role {
  name: string;
  count: number;
}

interface GameConfig {
  totalNumber: number;
  lineup: Array<Role> | null;
}

interface Room {
  roomNumber: number;
  players: Array<Player>;
  playersNumber: number;
  gameType: GameType;
  isEnd: boolean | null;
  isBegin: boolean | null;
  gameConfig: GameConfig;
}

interface QueryResult<T> {
  data: T;
  error?: ApolloError;
  loading: boolean;
  networkStatus: NetworkStatus;
}

const useWerewolfRoom = (roomNumber: number): QueryResult<Room> => {
  const { data, subscribeToMore, error, loading, networkStatus } = useQuery<
    werewolfRoomByNumber,
    werewolfRoomByNumberVariables
  >('WEREWOLF_GET_ROOM', { roomNumber }, { skip: !roomNumber });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: Subscription.WEREWOLF_SUB_ROOM_UPDATED,
      variables: { roomNumber },
      updateQuery: ({ werewolfRoomByNumber }, { subscriptionData: { data } }) => ({
        werewolfRoomByNumber: {
          ...werewolfRoomByNumber,
          ...data.werewolfRoomByNumber,
        },
      }),
      onError: (error) => Sentry.captureException(error),
    });

    return unsubscribe;
  }, []);

  if (!data) {
    return {
      data: {
        players: [],
        playersNumber: -1,
        roomNumber: 0,
        isBegin: false,
        isEnd: false,
        gameConfig: { lineup: [], totalNumber: 0 },
        gameType: GameType.Werewolf,
      },
      error,
      loading,
      networkStatus,
    };
  }

  return { data: { ...data.werewolfRoomByNumber }, error, loading, networkStatus };
};

const useUndercoverRoom = (roomNumber: number): QueryResult<Room> => {
  const { data, subscribeToMore, error, loading, networkStatus } = useQuery<
    undercoverRoomByNumber,
    undercoverRoomByNumberVariables
  >('UNDERCOVER_GET_ROOM', { roomNumber }, { skip: !roomNumber });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: Subscription.UNDERCOVER_SUB_ROOM_UPDATED,
      variables: { roomNumber },
      updateQuery: ({ undercoverRoomByNumber }, { subscriptionData: { data } }) => ({
        undercoverRoomByNumber: {
          ...undercoverRoomByNumber,
          ...data.undercoverRoomByNumber,
        },
      }),
      onError: (error) => Sentry.captureException(error),
    });

    return unsubscribe;
  }, []);

  if (!data) {
    return {
      data: {
        players: [],
        playersNumber: -1,
        roomNumber: 0,
        isBegin: false,
        isEnd: false,
        gameConfig: { lineup: [], totalNumber: 0 },
        gameType: GameType.Undercover,
      },
      error,
      loading,
      networkStatus,
    };
  }

  return { data: { ...data.undercoverRoomByNumber }, error, loading, networkStatus };
};

export { useWerewolfRoom, useUndercoverRoom };
