import Taro, { FC, navigateTo, useCallback, useEffect, useMemo, useState } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import GameHeader from '@components/GameHeader';
import { useMutation } from '@hooks/useQuery';
import useRoomNumber from '@hooks/useRoomNumber';
import { useUndercoverRoom } from '@hooks/useRoom';
import { undercoverSelectPos, undercoverSelectPosVariables } from '@services/graphql';
import { lock } from '@static/werewolf';

import './select.less';

const MaxPlayersNumber = 16;

const Select: FC = () => {
  const roomNumber = useRoomNumber();

  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: { players, playersNumber },
  } = useUndercoverRoom(roomNumber);

  const [select] = useMutation<undercoverSelectPos, undercoverSelectPosVariables>('UNDERCOVER_SELECT_POSITION');

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

  useEffect(() => {
    if (players && players.length === playersNumber) {
      navigateTo({ url: `room?roomNumber=${roomNumber}&position=${selected}` });
    }
  }, [playersNumber, players, roomNumber]);

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
