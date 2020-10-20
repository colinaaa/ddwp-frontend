import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.less';

export default class Help extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '首页',
  };

  render() {
    return (
      <View className='help'>
        <Text>一些帮助</Text>
      </View>
    );
  }
}
