import Taro, { FC, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';

const Show: FC = () => {
  const {
    params: { pos, charater },
  } = useRouter();

  return (
    <View>
      {pos}
      {charater}
    </View>
  );
};

export { Show };

export default Show;
