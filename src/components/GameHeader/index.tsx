import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

import { Card } from '@components/Card';

import './index.less';

interface Props {
  roomNumber?: number;
}

const GameHeader: FC<Props> = ({ roomNumber }) => {
  return (
    <Card>
      <View className='game-header-number'>
        <View className='game-header-number-span'>{roomNumber}</View>号房间
      </View>
    </Card>
  );
};

export { GameHeader };

export default GameHeader;
