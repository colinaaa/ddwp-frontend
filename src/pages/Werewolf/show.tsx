import Taro, { FC, useRouter } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import { getImageShow } from './lineup';

import './show.less';

const Show: FC = () => {
  const {
    params: { pos, charater = 'none' },
  } = useRouter();

  return (
    <View className='show'>
      <Image src={getImageShow(charater)} className='show-img' />
      <Text className='show-position'>{pos}</Text>
    </View>
  );
};

export { Show };

export default Show;
