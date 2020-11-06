import Taro, { FC, useState } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';

import useRoomNumber from '@hooks/useRoomNumber';
import usePosition from '@hooks/usePosition';
import { useLazyQuery, useSubscription } from '@hooks/useQuery';
import Card from '@components/Card';
import {
  GameType,
  undercoverRoomByNumber as getRoom,
  undercoverRoomByNumberVariables as getRoomVariables,
  UndercoverOnRoomUpdated as OnRoomUpdated,
  UndercoverOnRoomUpdatedVariables as OnRoomUpdatedVariables,
} from '@services/graphql';
import { lock } from '@static/werewolf';

const Room: FC = () => {
  const roomNumber = useRoomNumber();
  const pos = usePosition();

  const [room, setRoom] = useState<getRoom>({
    undercoverRoomByNumber: {
      roomNumber: 0,
      players: [],
      playersNumber: -1,
      __typename: 'UnderCoverRoom',
      gameType: GameType.Undercover,
      isEnd: false,
      isBegin: false,
      gameConfig: { __typename: 'UnderCoverConfig', totalNumber: 0, lineup: null },
    },
  });

  useSubscription<OnRoomUpdated, OnRoomUpdatedVariables>(
    'UNDERCOVER_SUB_ROOM_UPDATED',
    { roomNumber },
    {
      onSubscriptionData: ({ subscriptionData: { data } }) =>
        data &&
        data.undercoverRoomUpdated &&
        setRoom(({ undercoverRoomByNumber }) => ({
          undercoverRoomByNumber: {
            ...undercoverRoomByNumber,
            ...data.undercoverRoomUpdated,
          },
        })),
    },
  );

  const [queryRoom, { called }] = useLazyQuery<getRoom, getRoomVariables>('UNDERCOVER_GET_ROOM', undefined, {
    onCompleted: ({ undercoverRoomByNumber }) =>
      setRoom((pre) => ({
        undercoverRoomByNumber: {
          ...pre.undercoverRoomByNumber,
          ...undercoverRoomByNumber,
        },
      })),
  });

  if (roomNumber && !called) {
    queryRoom({ variables: { roomNumber } });
  }

  const { players, playersNumber } = room.undercoverRoomByNumber;

  return (
    <View className='room'>
      <Card>
        <View className='room-header'>
          <Text className='room-header-title'>词语</Text>
          <View className='room-header-position'>
            <Text className='room-header-position-text'>我的序号</Text>
            <View className='room-header-position-span'>{pos + 1}</View>
          </View>
        </View>
        <View className='room-players'>
          {[...Array(12).keys()].map((index) => (
            <View key={index} className='room-players-card'>
              {index < playersNumber ? (
                <Button className='room-players-card-btn'>{index + 1}</Button>
              ) : (
                <Image className='room-players-card-lock' src={lock} />
              )}
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};

export default Room;
