import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

interface Props {
  className?: string;
  width?: string;
}

const Card: FC<Props> = ({ children }) => {
  return <View className='card'>{children}</View>;
};

Card.externalClasses = ['werewolf-header'];

export { Card };

export default Card;
