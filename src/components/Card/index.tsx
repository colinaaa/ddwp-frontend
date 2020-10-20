import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

interface Props {
  className?: string;
  width?: string;
}

const Card: FC<Props> = ({ children, width }) => {
  return (
    <View className='card' style={{ width }}>
      {children}
    </View>
  );
};

Card.externalClasses = ['werewolf-header'];

export { Card };

export default Card;
