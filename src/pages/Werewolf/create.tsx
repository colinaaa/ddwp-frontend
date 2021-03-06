import { Text, View, Button, Image } from '@tarojs/components';
import Taro, { FC, useState, useCallback, navigateTo } from '@tarojs/taro';

import Modal from '@components/Modal';
import Card from '@components/Card';
import { useMutation } from '@hooks/useQuery';
import { createRoom as createRoomT, createRoomVariables, GameType } from '@services/graphql';

import { charaterNames, getImageFont, getImageSquare } from './lineup';

import './create.less';

const pagePath = '/pages/Werewolf/create';

// interface Props {}

const Create: FC = () => {
  const [cnt, setCnt] = useState(0);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({ name: '', count: 0 });
  const [lineup, setLineup] = useState(Object.fromEntries(charaterNames.map((name) => [name, 0])));

  const [createRoom, { data }] = useMutation<createRoomT, createRoomVariables>('CREATE_ROOM');

  if (data) {
    const {
      createRoom: { roomNumber },
    } = data;
    navigateTo({ url: `room?roomNumber=${roomNumber}` });
  }

  const handleSelect = (name: string) => () => {
    setOpen(true);
    setCurrent({ name, count: lineup[name] });
  };

  const handleConfirm = useCallback(() => {
    setCnt(cnt + (+current.count - lineup[current.name]));
    setLineup((lineup) => ({ ...lineup, [current.name]: +current.count }));
    setCurrent({ name: '', count: 0 });
  }, [current.name, current.count, lineup]);

  const handleInc = useCallback(() => {
    setCurrent((current) => ({ ...current, count: current.count + 1 }));
  }, []);

  const handleDec = useCallback(() => {
    if (current.count === 0) {
      return;
    }
    setCurrent((current) => ({ ...current, count: current.count - 1 }));
  }, [current.count]);

  const handleSubmit = async () => {
    const l = Object.entries(lineup)
      .filter(([, count]) => count !== 0)
      .map(([name, count]) => ({ name, count }));
    createRoom({ variables: { config: { totalNumber: cnt, gameType: GameType.Werewolf, lineup: l } } });
  };

  const close = useCallback(() => setOpen(false), []);
  const card = (
    <View className='werewolf-root'>
      <Card>
        <View className='werewolf-total'>
          <Text>总人数</Text>
          <Text className='werewolf-total-cnt'>{cnt}人</Text>
        </View>
      </Card>
      <View className='werewolf-charaters'>
        {Object.entries(lineup).map((arr) => {
          const [name, num] = arr;
          return (
            <View key={name}>
              <Button className='werewolf-charaters-button' onClick={handleSelect(name)}>
                <Image className='werewolf-charaters-img' src={getImageFont(name)} />
              </Button>
              <Text className='werewolf-charaters-cnt'>{num}</Text>
            </View>
          );
        })}
      </View>
      <Modal
        open={open}
        title={current.name}
        onClose={close}
        onConfirm={handleConfirm}
        onlyConfirm
        renderBadge={
          <View className='werewolf-modal-header'>
            <Image className='werewolf-modal-header-badge' src={getImageSquare(current.name)} />
          </View>
        }
      >
        <View className='werewolf-modal-content'>
          <Button className='werewolf-modal-content-dec' onClick={handleDec} disabled={current.count === 0}>
            -
          </Button>
          <Text className='werewolf-modal-content-current'>{current.count}</Text>
          <Button className='werewolf-modal-content-inc' onClick={handleInc}>
            +
          </Button>
        </View>
      </Modal>
      <View className='werewolf-padding' />
      <View className='werewolf-footer'>
        <Button onClick={handleSubmit}>确定阵容</Button>
        {/* <Button onClick={() => setOpen(!open)}>open</Button> */}
      </View>
    </View>
  );
  // const roomNumber = router.params['roomNumber'];
  return card;
};

export { pagePath, Create };

export default Create;
