import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

const Card: FC = ({ children }) => {
  return <View className='card'>{children}</View>;
};

export { Card };

export default Card;
