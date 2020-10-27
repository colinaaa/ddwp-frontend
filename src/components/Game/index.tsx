import Modal from '@components/Modal';
import { useMutation } from '@hooks/useQuery';
import { joinRoom, joinRoomVariables } from '@services/graphql';
import { View, Button, Input } from '@tarojs/components';
import Taro, { FC, setNavigationBarTitle, showModal, navigateTo, useState, useCallback, useEffect } from '@tarojs/taro';

import './index.less';

interface Props {
  // 游戏名称
  name: string;
}

const Game: FC<Props> = ({ name }) => {
  useEffect(() => {
    setNavigationBarTitle({ title: name });
  }, []);

  const [join] = useMutation<joinRoom, joinRoomVariables>('JOIN_ROOM');

  const [open, setOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');

  const handleCreate = useCallback(() => {
    navigateTo({ url: 'create' });
  }, []);

  const handleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleConfirm = useCallback(async () => {
    await join({ variables: { roomNumber: +roomNumber } });
    // TODO: deal with join error here
    navigateTo({ url: `select?roomNumber=${roomNumber}` });
  }, [roomNumber]);

  const handleChange = useCallback((e) => {
    setRoomNumber(e.detail.value);
  }, []);

  // BUG(2020-10-20): input something and not click confirm but somewhere in modal to
  //      close input. then re-enter the input will cause value dispear and
  //      input closed, but all states preserved.
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
