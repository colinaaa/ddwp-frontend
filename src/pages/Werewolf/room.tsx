import Taro, { FC, navigateTo, useCallback, useMemo, useState } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import { werewolfDeal, werewolfDealVariables, werewolfEndGame, werewolfEndGameVariables } from '@services/graphql';
import { useMutation } from '@hooks/useQuery';
import { useWerewolfRoom } from '@hooks/useRoom';
import useSelectedPositions from '@hooks/useSelectedPositions';
import useRoomNumber from '@hooks/useRoomNumber';
import { god, question, back, lock } from '@static/werewolf';
import GameHeader from '@components/GameHeader';

import './room.less';
import { getImageFont } from './lineup';

const MaxPlayersNumber = 16;

const Room: FC = () => {
  const roomNumber = useRoomNumber();

  const [submitted, setSubmitted] = useState(false);
  const [deadArray, setDeadArray] = useState<Array<boolean>>(() => Array(MaxPlayersNumber).fill(false));

  const {
    data: { players, playersNumber },
    error,
    networkStatus,
  } = useWerewolfRoom(roomNumber);

  const [deal] = useMutation<werewolfDeal, werewolfDealVariables>('WEREWOLF_SHUFFLE');

  const [end] = useMutation<werewolfEndGame, werewolfEndGameVariables>('WEREWOLF_END_GAME', {
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

  const handleClick = (index: number) => () => {
    setDeadArray((pre) => {
      const newArray = [...pre];
      newArray[index] = !pre[index];
      return newArray;
    });
  };

  const canStart = useMemo(() => !!players && playersNumber === players.length, [players, playersNumber]);

  const lastPlayer = useMemo(() => (players ? players.length : 0), [players]);

  if (error) {
    console.error(error, networkStatus);
    return null;
  }

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
