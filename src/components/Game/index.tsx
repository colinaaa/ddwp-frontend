import Modal from '@components/Modal';
import { View, Button, Input } from '@tarojs/components';
import Taro, { FC, setNavigationBarTitle, showModal, navigateTo, useState, useCallback } from '@tarojs/taro';

import './index.less';

interface Props {
  // 游戏名称
  name: string;
}

const Game: FC<Props> = ({ name }) => {
  setNavigationBarTitle({ title: name });

  const [open, setOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');

  const handleCreate = useCallback(() => {
    navigateTo({ url: 'create' });
  }, []);

  const handleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(roomNumber);
  }, [roomNumber]);

  const handleChange = useCallback((e) => {
    setRoomNumber(e.detail.value);
  }, []);

  return (
    <View className='game-root'>
      {open && (
        <Modal title='搜索房间' open={open} onClose={handleOpen} onConfirm={handleConfirm}>
          <Input
            value={roomNumber}
            type='digit'
            confirmType='done'
            maxLength={5}
            focus={true}
            placeholder={'请输入房间号'}
            placeholderClass='game-modal-input-placeholder'
            className='game-modal-input'
            onConfirm={handleConfirm}
            onInput={handleChange}
            // TODO: transform modal when open input
          />
        </Modal>
      )}
      <Button className='game-btn' onClick={handleCreate}>
        创建房间
      </Button>

      <Button className='game-btn' onClick={handleOpen}>
        加入房间
      </Button>

      <Button
        className='game-btn'
        onClick={() =>
          // TODO: use own modal
          showModal({ title: '游戏简介' })
        }
      >
        游戏简介
      </Button>
    </View>
  );
};

export { Game };

export default Game;
