import Taro, { FC, navigateTo, useCallback, useMemo, useRouter, useState } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import GameHeader from '@components/GameHeader';
import { useLazyQuery, useMutation } from '@hooks/useQuery';
import { GameType, getRoom, getRoomVariables, selectPosition, selectPositionVariables } from '@services/graphql';
import { lock } from '@static/werewolf';

import './select.less';
import Modal from '@components/Modal';
import { getImage } from './lineup';

const MaxPlayersNumber = 16;

const Select: FC = () => {
  const { params } = useRouter();
  const roomNumber = +params['roomNumber'];

  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

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

  const [select] = useMutation<selectPosition, selectPositionVariables>('SELECT_POSITION', {
    onCompleted: ({ selectPosition }) =>
      setRoom(({ roomByNumber }) => ({ roomByNumber: { ...roomByNumber, ...selectPosition } })),
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

  const handleConfirm = async () => {
    const { errors } = await select({ variables: { roomNumber, pos: selected } });
    if (errors) {
      console.error(errors);
      return false;
    }
    setSubmitted(true);
  };

  if (roomNumber && !called) {
    queryRoom({ variables: { roomNumber } });
  }

  const { players, playersNumber } = room.roomByNumber;

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

  const charater = useMemo(() => submitted && selectedPositions.get(selected), [
    submitted,
    selected,
    selectedPositions,
  ]);

  const handleClose = useCallback(() => {
    navigateTo({ url: `show?charater=${charater}&pos=${selected}` });
  }, [charater, selected]);

  return (
    <View className='select'>
      <GameHeader roomNumber={roomNumber} />
      {charater && (
        <Modal
          open={!!charater}
          renderBadge={
            <View>
              <Button disabled className='select-modal-title'>
                {charater}
              </Button>
            </View>
          }
          onlyConfirm
          noTitle
          title={charater}
          onClose={handleClose}
        >
          <View className='select-modal-container'>
            <Image className='select-modal-img' src={getImage(charater)} />
          </View>
        </Modal>
      )}
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
      <Button onClick={handleConfirm} disabled={selected === -1} className='select-confirm'>
        确定
      </Button>
    </View>
  );
};

export { Select };

export default Select;
