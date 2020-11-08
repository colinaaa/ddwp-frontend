import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import { Game } from '@components/Game';
import { cover } from '@static/undercover';

import './index.less';

export default class Undercover extends Component {
  // eslint-disable-next-line react/no-deprecated

  config: Config = {
    navigationBarTitleText: '谁是卧底',
    backgroundColor: '#ffffff',
  };

  render() {
    return (
      <View className='undercover-root'>
        <View className='undercover-image-container'>
          <Image className='undercover-img' src={cover} />
        </View>
        <View className='undercover-action'>
          <Game name='谁是卧底' />
        </View>
      </View>
    );
  }
}
