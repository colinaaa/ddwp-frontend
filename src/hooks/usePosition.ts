import { useRouter } from '@tarojs/taro';

const usePosition = () => {
  const {
    params: { pos },
  } = useRouter();

  return +pos;
};

export { usePosition };

export default usePosition;
