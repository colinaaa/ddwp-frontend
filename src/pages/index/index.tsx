/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-deprecated */
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

import GameCard from '@components/GameCard/index';
import { cardNames } from '@config/const';

import './index.less';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  render() {
    return (
      <View className='index-root'>
        <View className='index-cards'>
          {cardNames.map((name) => (
            <View key={name} className='index-card'>
              <GameCard name={name} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}
