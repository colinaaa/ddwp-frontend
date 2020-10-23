import Taro, { FC, useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { getRoom, getRoomVariables } from '@services/graphql';
import { useQuery } from '@hooks/useQuery';
import Card from '@components/Card';

import './room.less';

interface Props {
  roomNumber?: number;
}

const Room: FC<Props> = () => {
  const { params } = useRouter();

  const { data, loading, error } = useQuery<getRoom, getRoomVariables>('GET_ROOM', {
    roomNumber: +params['roomNumber'],
  });

  if (error) {
    return <Text>Error...</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Error..</Text>;
  }

  const { playersNumber } = data.roomByNumber;

  return (
    <View className='room'>
      <Card>
        <View className='room-number'>{params['roomNumber']}号房间</View>
      </Card>
      <View className='room-action'></View>

      <View className='room-charaters'>
        {Array(playersNumber).map((i) => (
          <View key={i} className='room-charaters-card'>
            ?
          </View>
        ))}
      </View>
    </View>
  );
};

Room.config = {
  navigationBarTitleText: 'abcde',
};

export { Room };

export default Room;
