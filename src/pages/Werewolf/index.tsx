/* eslint-disable @typescript-eslint/no-empty-function */
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { Game } from '@components/game';

import './index.less';

export default class Werewolf extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '狼人杀',
    backgroundColor: '#f5f5f5',
  };

  render() {
    return (
      <View className='Werewolf'>
        <Text>Hello world!</Text>
        <Game name='狼人杀' />
      </View>
    );
  }
}
