interface Character {
  name: string;
  img: string;
}

import {
  cupid,
  cupidFont,
  guard,
  guardFont,
  hunter,
  hunterFont,
  idiot,
  idiotFont,
  prophet,
  prophetFont,
  succubus,
  succubusFont,
  villager,
  villagerFont,
  witch,
  witchFont,
  wolfWhite,
  wolfWhiteFont,
  wolfbeauty,
  wolfbeautyFont,
  wolfKingFont,
  knightFont,
} from '@static/werewolf';

const charaterNames = [
  '村民',
  '狼人',
  '丘比特',
  '守卫',
  '魅魔',
  '猎人',
  '预言家',
  '女巫',
  '白痴',
  '狼美人',
  '白狼王',
  '骑士',
];

const img = {
  狼人: wolfWhite,
  村民: villager,
  丘比特: cupid,
  守卫: guard,
  魅魔: succubus,
  猎人: hunter,
  预言家: prophet,
  女巫: witch,
  白痴: idiot,
  狼美人: wolfbeauty,
};

const imgFont = {
  狼人: wolfWhiteFont,
  村民: villagerFont,
  丘比特: cupidFont,
  守卫: guardFont,
  魅魔: succubusFont,
  猎人: hunterFont,
  预言家: prophetFont,
  女巫: witchFont,
  白痴: idiotFont,
  狼美人: wolfbeautyFont,
  白狼王: wolfKingFont,
  骑士: knightFont,
};

const getImage = (name: string) => {
  return img[name];
};

const getImageFont = (name: string) => {
  return imgFont[name];
};

export { charaterNames, getImage, getImageFont };
