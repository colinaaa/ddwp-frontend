import Taro, { FC, useCallback, useRouter, useState } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import { getImageShow } from './lineup';

import './show.less';

const Show: FC = () => {
  const {
    params: { pos, charater },
  } = useRouter();

  const [back, setBack] = useState(false);

  const handleTurn = useCallback(() => {
    setBack((back) => !back);
  }, []);

  return (
    <View className='show'>
      <Image onClick={handleTurn} src={getImageShow(back ? charater || 'none' : 'none')} className='show-img' />
      <Text className='show-position'>{pos}</Text>
    </View>
  );
};

export { Show };

export default Show;
