import Taro, { FC, redirectTo, showToast, useCallback, useEffect, useMemo } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import classNames from 'classnames';

import Card from '@components/Card';
import useRoomNumber from '@hooks/useRoomNumber';
import usePosition from '@hooks/usePosition';
import { useUndercoverRoom } from '@hooks/useRoom';
import { useMutation } from '@hooks/useQuery';
import { undercoverSomeoneOut, undercoverSomeoneOutVariables } from '@services/graphql';

import { lock } from '@static/werewolf';

import './room.less';

const Room: FC = () => {
  const roomNumber = useRoomNumber();
  const pos = usePosition();

  const {
    data: { players, playersNumber, isEnd },
  } = useUndercoverRoom(roomNumber);

  const [out] = useMutation<undercoverSomeoneOut, undercoverSomeoneOutVariables>('UNDERCOVER_SOMEONE_OUT');

  const dead = useMemo(() => players.map(({ isOut }) => isOut), [players]);

  const handleClick = useCallback(
    (index: number) => async () => {
      const { errors } = await out({ variables: { roomNumber, index } });

      if (errors) {
        console.error(errors);
        await showToast({ title: errors.join(' ') });
      }
      return false;
    },
    [roomNumber],
  );

  useEffect(() => {
    if (isEnd) {
      // TODO: jump to success
      redirectTo({ url: 'index' });
    }
  }, [isEnd]);

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
      </Card>
      <View className='room-players'>
        {[...Array(12).keys()].map((index) => (
          <View key={index} className='room-players-card'>
            {index < playersNumber ? (
              <View className='room-players-card'>
                <Button
                  onClick={handleClick(index)}
                  className={classNames('room-players-card-btn', {
                    'room-players-card-dead': dead[index],
                  })}
                >
                  {index + 1}
                </Button>
                <Text
                  className={classNames('room-players-card-deadtext', {
                    'room-players-card-deadtext-active': dead[index],
                  })}
                >
                  已出局
                </Text>
              </View>
            ) : (
              <Image className='room-players-card-lock' src={lock} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Room;
