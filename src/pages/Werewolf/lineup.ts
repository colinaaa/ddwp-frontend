interface Character {
  name: string;
  img: string;
}

import { cupid, guard, hunter, idiot, prophet, succubus, villager, witch, wolfWhite } from '@static/werewolf';

const charaterNames = ['狼人', '村民', '丘比特', '守卫', '女巫', '猎人', '预言家', '魅魔', '白痴'];

const img = {
  狼人: wolfWhite,
  村民: villager,
  丘比特: cupid,
  守卫: guard,
  女巫: witch,
  猎人: hunter,
  预言家: prophet,
  魅魔: succubus,
  白痴: idiot,
};

const getImage = (name: string) => {
  return img[name];
};

export { charaterNames, getImage };
