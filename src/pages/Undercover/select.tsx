import Taro, { FC, useCallback, useMemo, useRouter, useState } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import GameHeader from '@components/GameHeader';
import { useLazyQuery, useMutation, useSubscription } from '@hooks/useQuery';
import {
  GameType,
  undercoverRoomByNumber as getRoom,
  undercoverRoomByNumberVariables as getRoomVariables,
  UndercoverOnRoomUpdated as OnRoomUpdated,
  UndercoverOnRoomUpdatedVariables as OnRoomUpdatedVariables,
  undercoverSelectPos,
  undercoverSelectPosVariables,
} from '@services/graphql';
import { lock } from '@static/werewolf';

import './select.less';

const MaxPlayersNumber = 16;

const Select: FC = () => {
  const { params } = useRouter();
  const roomNumber = +params['roomNumber'];

  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const [room, setRoom] = useState<getRoom>({
    undercoverRoomByNumber: {
      roomNumber: 0,
      players: [],
      playersNumber: 0,
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
          undercoverRoomByNumber: { ...undercoverRoomByNumber, ...data.undercoverRoomUpdated },
        })),
    },
  );

  const [select] = useMutation<undercoverSelectPos, undercoverSelectPosVariables>('UNDERCOVER_SELECT_POSITION', {
    onCompleted: ({ undercoverSelectPos }) =>
      setRoom(({ undercoverRoomByNumber }) => ({
        undercoverRoomByNumber: { ...undercoverRoomByNumber, ...undercoverSelectPos },
      })),
  });

  const [queryRoom, { called }] = useLazyQuery<getRoom, getRoomVariables>('UNDERCOVER_GET_ROOM', undefined, {
    onCompleted: ({ undercoverRoomByNumber }) =>
      setRoom((pre) => ({ undercoverRoomByNumber: { ...pre.undercoverRoomByNumber, ...undercoverRoomByNumber } })),
  });

  const handleSelect = (index: number) => () => {
    if (submitted) {
      return false;
    }
    if (index === selected) {
      setSelected(-1);
      return false;
    }
    setSelected(index);
  };

  if (roomNumber && !called) {
    queryRoom({ variables: { roomNumber } });
  }

  const { players, playersNumber } = room.undercoverRoomByNumber;

  const selectedPositions = useMemo(
    () =>
      new Map(
        (players ? players.filter(({ position }) => position !== -1) : []).map(({ position, role }) => [
          position,
          role,
        ]),
      ),
    [players],
  );

  const handleConfirm = useCallback(async () => {
    const { errors } = await select({ variables: { roomNumber, pos: selected } });
    if (errors) {
      console.error(errors);
      return false;
    }
    setSubmitted(true);
  }, [roomNumber, selected, selectedPositions]);

  return (
    <View className='select'>
      <GameHeader roomNumber={roomNumber} />

      <View key={roomNumber} className='select-charaters'>
        {[...Array(MaxPlayersNumber).keys()].map((index) => (
          <View
            key={index}
            className={classNames('select-charaters-card', { 'select-charaters-card-active': index === selected })}
          >
            {index < playersNumber ? (
              <Button disabled={selectedPositions.has(index)} onClick={handleSelect(index)}>
                {index + 1}
              </Button>
            ) : (
              <Image className='select-charaters-card-lock' src={lock} />
            )}
          </View>
        ))}
      </View>
      <Button onClick={handleConfirm} disabled={selected === -1 || submitted} className='select-confirm'>
        {submitted ? '等待其他玩家' : '确定'}
      </Button>
    </View>
  );
};

export { Select };

export default Select;
