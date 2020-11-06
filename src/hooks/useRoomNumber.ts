import { useRouter } from '@tarojs/taro';

const useRoomNumber = () => {
  const { params } = useRouter();

  return +params['roomNumber'];
};

export { useRoomNumber };

export default useRoomNumber;
