import Taro, { FC, navigateTo } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import { getRoute } from '@config/const';
import { useQuery } from '@hooks/useQuery';

import classes from './index.less';

interface Props {
  name: string;
}

const Card: FC<Props> = ({ name }: Props) => {
  // const { loading, error, data } = useQuery('GET_ALL_ROOMS');

  // if (loading) {
  //   return <View>loading...</View>;
  // }
  // if (error || !data) {
  //   console.log(error);
  //   return <View>error...</View>;
  // }

  // if (!data.allRooms) {
  //   return <Text>no room avaliable</Text>;
  // }

  return (
    <View className={classes.root}>
      {/* {data.allRooms.map((room) => (
        <Text key={room.roomNumber}>{room.roomNumber}</Text>
      ))} */}
      <Button onClick={() => navigateTo({ url: getRoute(name) })}>{name}</Button>
    </View>
  );
};

export { Card };

export default Card;
