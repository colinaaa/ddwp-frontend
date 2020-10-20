import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Rule extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {
    console.log('bbb');
  }

  config: Config = {
    navigationBarTitleText: '规则简介',
  };

  render() {
    return (
      <View className='rule'>
        <Text>一些规则</Text>
      </View>
    );
  }
}
