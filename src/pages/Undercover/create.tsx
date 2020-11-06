import Taro, { FC, useCallback, useState } from '@tarojs/taro';
import { Text, View, Button } from '@tarojs/components';
import classNames from 'classnames';

import './create.less';

const Create: FC = () => {
  const [selected, setSelected] = useState<number>(-1);
  const handleSelect = useCallback(
    (index: number) => () => {
      if (selected === index) {
        setSelected(-1);
        return false;
      }
      setSelected(index);
    },
    [selected],
  );
  return (
    <View className='create'>
      <Text className='create-title'>请选择玩家的人数：</Text>
      <View className='create-select'>
        {[...Array(9).keys()].map((index) => (
          <Button
            className={classNames('create-select-card', { 'create-select-card-active': selected === index })}
            key={index}
            onClick={handleSelect(index)}
          >
            {index + 4}
          </Button>
        ))}
      </View>
      <View className='create-confirm'>
        <Button
          className={classNames('create-confirm-btn', { 'create-confirm-btn-active': selected !== -1 })}
          disabled={selected === -1}
        >
          确定阵容
        </Button>
      </View>
    </View>
  );
};

Create.config = {
  navigationBarTitleText: '谁是卧底',
};

export default Create;
