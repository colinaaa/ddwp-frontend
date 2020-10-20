import { View, Button } from '@tarojs/components';
import Taro, { FC, setNavigationBarTitle, showModal, navigateTo } from '@tarojs/taro';

import './index.less';

interface Props {
  // 游戏名称
  name: string;
}

const Game: FC<Props> = ({ name }) => {
  setNavigationBarTitle({ title: name });

  const handleCreate = () => {
    navigateTo({ url: 'create' });
  };

  return (
    <View className='game-root'>
      <Button className='game-btn' onClick={handleCreate}>
        创建房间
      </Button>

      <Button
        className='game-btn'
        onClick={() =>
          // TODO: use own Modal
          showModal({
            title: '加入房间',
          })
        }
      >
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
