import Taro, { FC, useCallback, useMemo, useRouter, useState } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';

import { getRoom, getRoomVariables, OnRoomUpdated, OnRoomUpdatedVariables } from '@services/graphql';
import { useLazyQuery, useSubscription } from '@hooks/useQuery';
import Card from '@components/Card';
import { god, question, back, lock } from '@static/werewolf';

import './room.less';

interface Props {
  roomNumber?: number;
}

const MaxPlayersNumber = 16;

const Room: FC<Props> = () => {
  const [begin, setBegin] = useState(false);
  const handleConfirm = useCallback(() => {
    setBegin(true);
  }, []);

  const router = useRouter();
  const roomNumber = +router.params['roomNumber'];

  const [room, setRoom] = useState<OnRoomUpdated>({
    roomUpdated: { players: [], playersNumber: MaxPlayersNumber + 1, __typename: 'WerewolfRoom', roomNumber: 0 },
  });

  useSubscription<OnRoomUpdated, OnRoomUpdatedVariables>(
    'SUB_ROOM_UPDATED',
    {
      roomNumber,
    },
    {
      onSubscriptionData: ({ subscriptionData }) =>
        subscriptionData.data && setRoom((pre) => ({ ...pre, ...subscriptionData.data })),
    },
  );

  const [queryRoom, { called }] = useLazyQuery<getRoom, getRoomVariables>('GET_ROOM', undefined, {
    onCompleted: (data) => setRoom({ roomUpdated: { ...data.roomByNumber } }),
  });

  if (roomNumber && !called) {
    console.log(roomNumber, room.roomUpdated.roomNumber);
    queryRoom({ variables: { roomNumber } });
  }

  const { playersNumber, players } = room.roomUpdated;

  const canStart = useMemo(() => !!players && playersNumber === players.length, [players, playersNumber]);

  const lastPlayer = useMemo(() => (players ? players.length : 0), [players]);

  const action = (
    <View className='room-action'>
      <View className='room-action-container'>
        <Image className='room-action-img' src={god} />
        <View className='room-action-id'>
          <View className='room-action-id-title'>
            <Text className='room-action-id-title'>我的身份</Text>
          </View>
          <View className='room-action-id-card'>上帝</View>
        </View>
      </View>
      <Button className='room-action-btn'>开始发牌</Button>
    </View>
  );

  const backImage = <Image className='room-charaters-card-back' src={back} />;
  const questionImage = <Image className='room-charaters-card-question' src={question} />;

  return (
    <View className='room'>
      <Card>
        <View className='room-number'>
          <View className='room-number-span'>{roomNumber}</View>号房间
        </View>
      </Card>
      {begin && action}
      <View className='room-charaters'>
        {Array(MaxPlayersNumber).map((i, index) =>
          index < playersNumber ? (
            <View key={i} className='room-charaters-card'>
              {index >= lastPlayer ? questionImage : backImage}
              {index >= lastPlayer && <View className='room-charaters-card-cnt'>{index + 1}</View>}
            </View>
          ) : (
            <View key={i} className='room-charaters-card'>
              <Image className='room-charaters-card-lock' src={lock} />
            </View>
          ),
        )}
      </View>
      <View>
        {!begin && (
          <Button onClick={handleConfirm} className='room-confirm'>
            确定
          </Button>
        )}
      </View>
    </View>
  );
};

Room.config = {
  navigationBarTitleText: '狼人杀',
};

export { Room };

export default Room;
