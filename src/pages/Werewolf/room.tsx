import Taro, { FC, navigateTo, useCallback, useMemo, useRouter, useState } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import {
  getRoom,
  getRoomVariables,
  OnRoomUpdated,
  OnRoomUpdatedVariables,
  shuffle,
  shuffleVariables,
  endGame,
  endGameVariables,
} from '@services/graphql';
import { useLazyQuery, useMutation, useSubscription } from '@hooks/useQuery';
import { god, question, back, lock } from '@static/werewolf';
import GameHeader from '@components/GameHeader';

import './room.less';
import { getImageFont } from './lineup';
import useSelectedPositions from '@hooks/useSelectedPositions';

interface Props {
  roomNumber?: number;
}

const MaxPlayersNumber = 16;

const Room: FC<Props> = () => {
  const router = useRouter();
  const roomNumber = +router.params['roomNumber'];

  const [submitted, setSubmitted] = useState(false);
  const [deadArray, setDeadArray] = useState<Array<boolean>>(() => Array(MaxPlayersNumber).fill(false));

  const [room, setRoom] = useState<OnRoomUpdated>({
    roomUpdated: {
      players: [],
      playersNumber: MaxPlayersNumber + 1,
      __typename: 'WerewolfRoom',
      roomNumber: 0,
      isBegin: false,
      isEnd: false,
      gameConfig: { lineup: [], __typename: 'WerewolfConfig', totalNumber: 0 },
    },
  });

  const [deal] = useMutation<shuffle, shuffleVariables>('SHUFFLE', {
    onCompleted: ({ deal }) => setRoom(({ roomUpdated }) => ({ roomUpdated: { ...roomUpdated, ...deal } })),
  });

  const [end] = useMutation<endGame, endGameVariables>('END_GAME', {
    onCompleted: () => navigateTo({ url: 'index' }),
  });

  const handleSubmit = useCallback(() => {
    if (submitted) {
      end({ variables: { roomNumber } });
      return false;
    }
    setSubmitted(true);
    deal({ variables: { roomNumber } });
  }, [roomNumber, submitted]);

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
    onCompleted: ({ roomByNumber }) =>
      setRoom(({ roomUpdated }) => ({ roomUpdated: { ...roomUpdated, ...roomByNumber } })),
  });

  if (roomNumber && !called) {
    queryRoom({ variables: { roomNumber } });
  }

  const { playersNumber, players } = room.roomUpdated;

  const handleClick = (index: number) => () => {
    setDeadArray((pre) => {
      const newArray = [...pre];
      newArray[index] = !pre[index];
      return newArray;
    });
  };

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
      <Button disabled={!canStart} onClick={handleSubmit} className='room-action-btn'>
        {submitted ? '结束游戏' : '开始发牌'}
      </Button>
    </View>
  );

  const backImage = <Image className='room-charaters-card-back' src={back} />;
  const questionImage = <Image className='room-charaters-card-question' src={question} />;
  const selectedPos = useSelectedPositions(players);

  const submittedBoard = [...Array(MaxPlayersNumber).keys()].map((index) => (
    <View key={index}>
      <View key={index} className='room-begin-card'>
        {index < playersNumber ? (
          <Image
            onClick={handleClick(index)}
            className={classNames('room-begin-card-show', { 'room-begin-card-show-dead': deadArray[index] })}
            src={getImageFont(selectedPos.get(index) || 'none')}
          />
        ) : (
          <Image className='room-begin-card-lock' src={lock} />
        )}
        {deadArray[index] && <Text className='room-begin-card-show-deadtext'>已出局</Text>}
      </View>
      <View className='room-begin-card-cnt'>{index + 1}</View>
    </View>
  ));

  return (
    <View className='room'>
      {!submitted && <GameHeader roomNumber={roomNumber} />}
      {action}
      <View className='room-charaters'>
        {submitted
          ? submittedBoard
          : [...Array(MaxPlayersNumber).keys()].map((index) => (
              <View key={`no-${index}`} className='room-charaters-card'>
                {index < playersNumber ? (
                  <View>
                    {index >= lastPlayer ? questionImage : backImage}
                    {index >= lastPlayer && <View className='room-charaters-card-cnt'>{index + 1}</View>}
                  </View>
                ) : (
                  <Image className='room-charaters-card-lock' src={lock} />
                )}
              </View>
            ))}
      </View>
    </View>
  );
};

Room.config = {
  navigationBarTitleText: '狼人杀',
};

export { Room };

export default Room;
