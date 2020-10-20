import { Text, View, Button, Image } from '@tarojs/components';
import Taro, { FC, useState, useCallback } from '@tarojs/taro';

import Modal from '@components/Modal';
import Card from '@components/Card';
import { charaterNames, getImage } from './lineup';

import './create.less';

const pagePath = '/pages/Werewolf/create';

// interface Props {}

const Create: FC = () => {
  const [cnt, setCnt] = useState(0);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({ name: '', count: 0 });
  const [lineup, setLineup] = useState(Object.fromEntries(charaterNames.map((name) => [name, 0])));

  console.log(Object.entries(lineup));

  const handleSelect = (name: string) => () => {
    console.log('name', name);
    setOpen(true);
    setCurrent({ name, count: lineup[name] });
  };

  const handleConfirm = () => {
    setCnt(cnt + +current.count);
    setLineup((lineup) => ({ ...lineup, [current.name]: +current.count }));
    setCurrent({ name: '', count: 0 });
  };

  const handleInc = () => {
    setCurrent((current) => ({ ...current, count: current.count + 1 }));
  };

  const handleDec = () => {
    if (current.count === 0) {
      return;
    }
    setCurrent((current) => ({ ...current, count: current.count - 1 }));
  };

  const handleSubmit = () => {
    console.log(lineup);
  };

  const close = useCallback(() => setOpen(false), []);
  const card = (
    <View className='werewolf-root'>
      <Card>
        <View className='werewolf-total'>
          <Text>总人数 {cnt}</Text>
        </View>
      </Card>
      <View className='werewolf-charaters'>
        {Object.entries(lineup).map((arr) => {
          const [name, num] = arr;
          console.log(name, num);
          return (
            <Button className='werewolf-charaters-button' key={name} onClick={handleSelect(name)}>
              <Image className='werewolf-charaters-img' src={getImage(name)} />
            </Button>
          );
        })}
      </View>
      <Modal
        open={open}
        title={current.name}
        onClose={close}
        onConfirm={handleConfirm}
        renderBadge={
          <View className='werewolf-modal-header'>
            <Image className='werewolf-modal-header-badge' src={getImage(current.name)} />
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
        <Button onClick={handleSubmit}>确认</Button>
        {/* <Button onClick={() => setOpen(!open)}>open</Button> */}
      </View>
    </View>
  );
  // const roomNumber = router.params['roomNumber'];
  return card;
};

export { pagePath, Create };

export default Create;
