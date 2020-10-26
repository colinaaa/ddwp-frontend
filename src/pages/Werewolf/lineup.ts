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
  villagerSquare,
  wolfbeautySquare,
  cupidSquare,
  succubusSquare,
  guardSquare,
  wolfWhiteSquare,
  idiotSquare,
  witchSquare,
  hunterSquare,
  prophetSquare,
  wolfKingSquare,
  knightSquare,
  villagerShow,
  wolfbeautyShow,
  cupidShow,
  succubusShow,
  guardShow,
  wolfWhiteShow,
  idiotShow,
  witchShow,
  // hunterShow,
  prophetShow,
  wolfKingShow,
  knightShow,
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

const imgSquare = {
  狼人: wolfWhiteSquare,
  村民: villagerSquare,
  丘比特: cupidSquare,
  守卫: guardSquare,
  魅魔: succubusSquare,
  猎人: hunterSquare,
  预言家: prophetSquare,
  女巫: witchSquare,
  白痴: idiotSquare,
  狼美人: wolfbeautySquare,
  白狼王: wolfKingSquare,
  骑士: knightSquare,
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

const imgShow = {
  狼人: wolfWhiteShow,
  村民: villagerShow,
  丘比特: cupidShow,
  守卫: guardShow,
  魅魔: succubusShow,
  // 猎人: hunterShow,
  预言家: prophetShow,
  女巫: witchShow,
  白痴: idiotShow,
  狼美人: wolfbeautyShow,
  白狼王: wolfKingShow,
  骑士: knightShow,
};

const getImage = (name: string) => img[name];

const getImageFont = (name: string) => imgFont[name];

const getImageSquare = (name: string) => imgSquare[name];

const getImageShow = (name: string) => imgShow[name];

export { charaterNames, getImage, getImageFont, getImageSquare, getImageShow };
