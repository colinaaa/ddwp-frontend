/* eslint-disable @typescript-eslint/no-empty-function */
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import { Game } from '@components/Game';
import { wolfWhite } from '@static/werewolf';

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
    backgroundColor: '#ffffff',
  };

  render() {
    return (
      <View className='werewolf-root'>
        <View className='werewolf-image-container'>
          <Image className='werewolf-img' src={wolfWhite} />
        </View>
        <View className='werewolf-action'>
          <Game name='狼人杀' />
        </View>
      </View>
    );
  }
}
