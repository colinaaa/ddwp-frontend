import Taro, { FC } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';

import Card from '@components/Card';
import useRoomNumber from '@hooks/useRoomNumber';
import usePosition from '@hooks/usePosition';
import { useUndercoverRoom } from '@hooks/useRoom';

import { lock } from '@static/werewolf';

const Room: FC = () => {
  const roomNumber = useRoomNumber();
  const pos = usePosition();

  const {
    data: { players, playersNumber },
  } = useUndercoverRoom(roomNumber);

  return (
    <View className='room'>
      <Card>
        <View className='room-header'>
          <Text className='room-header-title'>词语</Text>
          <View className='room-header-position'>
            <Text className='room-header-position-text'>我的序号</Text>
            <View className='room-header-position-span'>{pos + 1}</View>
          </View>
        </View>
        <View className='room-players'>
          {[...Array(12).keys()].map((index) => (
            <View key={index} className='room-players-card'>
              {index < playersNumber ? (
                <Button className='room-players-card-btn'>{index + 1}</Button>
              ) : (
                <Image className='room-players-card-lock' src={lock} />
              )}
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};

export default Room;
