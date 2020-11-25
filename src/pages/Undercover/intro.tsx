import Taro, { FC } from '@tarojs/taro';
import { ScrollView, Image } from '@tarojs/components';

import { intro } from '@static/undercover';

import './intro.less';

const Intro: FC = () => (
  <ScrollView scrollY className='intro'>
    <Image className='intro-img' src={intro} />
  </ScrollView>
);

export { Intro };

export default Intro;
