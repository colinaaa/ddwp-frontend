import Taro, { FC, navigateTo, useCallback, useMemo } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import { getRoute } from '@config/const';

import './index.less';

interface Props {
  name: string;
}

const GameCard: FC<Props> = ({ name }: Props) => {
  const url = getRoute(name);

  const handleClick = useCallback(() => {
    navigateTo({ url });
  }, [url]);

  const hasGame = useMemo(() => !!url, [url]);

  return (
    <View className='gamecard-root'>
      <Button onClick={handleClick} disabled={!hasGame}>
        {hasGame ? name : '敬请期待'}
      </Button>
    </View>
  );
};

export { GameCard };

export default GameCard;
