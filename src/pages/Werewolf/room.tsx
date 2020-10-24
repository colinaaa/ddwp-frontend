import Taro, { FC, useRouter } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';

import { getRoom, getRoomVariables } from '@services/graphql';
import { useQuery } from '@hooks/useQuery';
import Card from '@components/Card';
import { god } from '@static/werewolf';

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
        <View className='room-number'>
          <View className='room-number-span'>{params['roomNumber']}</View>号房间
        </View>
      </Card>
      <View className='room-action'>
        <View className='room-action-container'>
          <Image className='room-action-img' src={god} />
          <View className='room-action-id'>
            <View className='room-action-id-title'>
              <Text className='room-action-id-title'>我的身份</Text>
            </View>
            <View className='room-action-id-card'>上帝</View>
          </View>
        </View>
        <Button className='room-action-btn'>开始发牌</Button>
      </View>

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
  navigationBarTitleText: '狼人杀',
};

export { Room };

export default Room;
