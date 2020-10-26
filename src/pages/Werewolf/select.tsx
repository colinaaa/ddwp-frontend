import Taro, { FC, useMemo, useRouter, useState } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import GameHeader from '@components/GameHeader';
import { useLazyQuery } from '@hooks/useQuery';
import { GameType, getRoom, getRoomVariables } from '@services/graphql';
import { lock } from '@static/werewolf';

import './select.less';

const MaxPlayersNumber = 16;

const Select: FC = () => {
  const { params } = useRouter();
  const roomNumber = +params['roomNumber'];

  const [selected, setSelected] = useState(-1);

  const [room, setRoom] = useState<getRoom>({
    roomByNumber: {
      roomNumber: 0,
      players: [],
      playersNumber: 0,
      __typename: 'WerewolfRoom',
      gameType: GameType.Werewolf,
      isEnd: false,
      isBegin: false,
      gameConfig: { __typename: 'WerewolfConfig', totalNumber: 0, lineup: null },
    },
  });

  const [queryRoom, { called }] = useLazyQuery<getRoom, getRoomVariables>('GET_ROOM', undefined, {
    onCompleted: ({ roomByNumber }) => setRoom((pre) => ({ roomByNumber: { ...pre.roomByNumber, ...roomByNumber } })),
  });

  const handleSelect = (index: number) => () => {
    if (index === selected) {
      setSelected(-1);
      return false;
    }
    setSelected(index);
  };

  if (roomNumber && !called) {
    queryRoom({ variables: { roomNumber } });
  }

  const { players, playersNumber } = room.roomByNumber;

  const selectedPositions = useMemo(
    () => new Set((players ? players.filter(({ position }) => position) : []).map(({ position }) => position)),
    [players],
  );

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
      <Button disabled={selected === -1} className='select-confirm'>
        确定
      </Button>
    </View>
  );
};

export { Select };

export default Select;
