import Taro, { FC, navigateTo, showModal, useCallback, useMemo, useState } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import classNames from 'classnames';

import GameHeader from '@components/GameHeader';
import { useLazyQuery, useMutation, useSubscription } from '@hooks/useQuery';
import useRoomNumber from '@hooks/useRoomNumber';
import Modal from '@components/Modal';
import {
  GameType,
  werewolfRoomByNumber as getRoom,
  werewolfRoomByNumberVariables as getRoomVariables,
  WerewolfOnRoomUpdated as OnRoomUpdated,
  WerewolfOnRoomUpdatedVariables as OnRoomUpdatedVariables,
  werewolfSelectPos,
  werewolfSelectPosVariables,
} from '@services/graphql';
import { lock } from '@static/werewolf';
import { getImage } from './lineup';

import './select.less';

const MaxPlayersNumber = 16;

const Select: FC = () => {
  const roomNumber = useRoomNumber();

  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const [room, setRoom] = useState<getRoom>({
    werewolfRoomByNumber: {
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

  useSubscription<OnRoomUpdated, OnRoomUpdatedVariables>(
    'WEREWOLF_SUB_ROOM_UPDATED',
    { roomNumber },
    {
      onSubscriptionData: ({ subscriptionData: { data } }) =>
        data &&
        data.werewolfRoomUpdated &&
        setRoom(({ werewolfRoomByNumber }) => ({
          werewolfRoomByNumber: { ...werewolfRoomByNumber, ...data.werewolfRoomUpdated },
        })),
    },
  );

  const [select] = useMutation<werewolfSelectPos, werewolfSelectPosVariables>('WEREWOLF_SELECT_POSITION', {
    onCompleted: ({ werewolfSelectPos }) =>
      setRoom(({ werewolfRoomByNumber }) => ({
        werewolfRoomByNumber: { ...werewolfRoomByNumber, ...werewolfSelectPos },
      })),
  });

  const [queryRoom, { called }] = useLazyQuery<getRoom, getRoomVariables>('WEREWOLF_GET_ROOM', undefined, {
    onCompleted: ({ werewolfRoomByNumber }) =>
      setRoom((pre) => ({ werewolfRoomByNumber: { ...pre.werewolfRoomByNumber, ...werewolfRoomByNumber } })),
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

  const { players, playersNumber } = room.werewolfRoomByNumber;

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
    navigateTo({ url: `show?charater=${charater}&pos=${selected + 1}` });
  }, [charater, selected]);

  const handleConfirm = useCallback(async () => {
    const { errors } = await select({ variables: { roomNumber, pos: selected } });
    if (errors) {
      console.error(errors);
      showModal({ title: '选择错误', content: errors.map(({ message }) => message).join(' ') });
      return false;
    }
    setSubmitted(true);
  }, [roomNumber, selected, selectedPositions]);

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
      <Button onClick={handleConfirm} disabled={selected === -1 || submitted} className='select-confirm'>
        {submitted ? '等待其他玩家' : '确定'}
      </Button>
    </View>
  );
};

export { Select };

export default Select;
