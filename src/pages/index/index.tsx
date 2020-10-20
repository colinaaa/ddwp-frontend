import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import GameCard from '@components/GameCard/index';
import { cardNames } from '@config/const';

import classes from './index.less';

export default class Index extends Component {
  state = {
    cnt: 0,
    open: true,
    aa: 0,
  };

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

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <View className={classes.root}>
        <View className={classes.cards}>
          {cardNames.map((name) => (
            <View key={name} className={classes.card}>
              <GameCard name={name} />
            </View>
          ))}
        </View>
        <Button onClick={() => this.setState({ open: true })}>open</Button>
      </View>
    );
  }
}
