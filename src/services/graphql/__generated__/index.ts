/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: werewolfSelectPos
// ====================================================

export interface werewolfSelectPos_werewolfSelectPos_players {
  __typename: "Player";
  /**
   * 角色
   */
  role: string | null;
  /**
   * 位置
   */
  position: number;
}

export interface werewolfSelectPos_werewolfSelectPos {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: werewolfSelectPos_werewolfSelectPos_players[] | null;
}

export interface werewolfSelectPos {
  /**
   * 选择位置
   */
  werewolfSelectPos: werewolfSelectPos_werewolfSelectPos;
}

export interface werewolfSelectPosVariables {
  pos: number;
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: werewolfDeal
// ====================================================

export interface werewolfDeal_werewolfDeal_players {
  __typename: "Player";
  /**
   * 位置
   */
  position: number;
  /**
   * 角色
   */
  role: string | null;
}

export interface werewolfDeal_werewolfDeal {
  __typename: "WerewolfRoom";
  /**
   * 玩家信息
   */
  players: werewolfDeal_werewolfDeal_players[] | null;
}

export interface werewolfDeal {
  /**
   * 开始发牌
   */
  werewolfDeal: werewolfDeal_werewolfDeal;
}

export interface werewolfDealVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: werewolfEndGame
// ====================================================

export interface werewolfEndGame_werewolfEndGame {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface werewolfEndGame {
  /**
   * 结束游戏
   */
  werewolfEndGame: werewolfEndGame_werewolfEndGame;
}

export interface werewolfEndGameVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: werewolfJoinRoom
// ====================================================

export interface werewolfJoinRoom_werewolfJoinRoom_players {
  __typename: "Player";
  /**
   * 位置
   */
  position: number;
}

export interface werewolfJoinRoom_werewolfJoinRoom {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: werewolfJoinRoom_werewolfJoinRoom_players[] | null;
  /**
   * 玩家人数
   */
  playersNumber: number;
}

export interface werewolfJoinRoom {
  /**
   * 加入房间
   */
  werewolfJoinRoom: werewolfJoinRoom_werewolfJoinRoom;
}

export interface werewolfJoinRoomVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: werewolfCreateRoom
// ====================================================

export interface werewolfCreateRoom_werewolfCreateRoom {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家人数
   */
  playersNumber: number;
}

export interface werewolfCreateRoom {
  /**
   * 创建房间
   */
  werewolfCreateRoom: werewolfCreateRoom_werewolfCreateRoom;
}

export interface werewolfCreateRoomVariables {
  config: InputGameConfig;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRooms
// ====================================================

export interface getAllRooms_werewolfRooms {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface getAllRooms {
  werewolfRooms: getAllRooms_werewolfRooms[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRoom
// ====================================================

export interface getRoom_werewolfRoomByNumber_players {
  __typename: "Player";
  /**
   * 角色
   */
  role: string | null;
  /**
   * 位置
   */
  position: number;
}

export interface getRoom_werewolfRoomByNumber_gameConfig_lineup {
  __typename: "Role";
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色数量
   */
  count: number;
}

export interface getRoom_werewolfRoomByNumber_gameConfig {
  __typename: "WerewolfConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: getRoom_werewolfRoomByNumber_gameConfig_lineup[] | null;
}

export interface getRoom_werewolfRoomByNumber {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: getRoom_werewolfRoomByNumber_players[] | null;
  /**
   * 玩家人数
   */
  playersNumber: number;
  /**
   * 游戏类型
   */
  gameType: GameType;
  /**
   * 狼人杀游戏配置
   */
  gameConfig: getRoom_werewolfRoomByNumber_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface getRoom {
  /**
   * 查询房间
   */
  werewolfRoomByNumber: getRoom_werewolfRoomByNumber;
}

export interface getRoomVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnRoomUpdated
// ====================================================

export interface OnRoomUpdated_werewolfRoomUpdated_players {
  __typename: "Player";
  /**
   * 位置
   */
  position: number;
  /**
   * 角色
   */
  role: string | null;
}

export interface OnRoomUpdated_werewolfRoomUpdated_gameConfig_lineup {
  __typename: "Role";
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色数量
   */
  count: number;
}

export interface OnRoomUpdated_werewolfRoomUpdated_gameConfig {
  __typename: "WerewolfConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: OnRoomUpdated_werewolfRoomUpdated_gameConfig_lineup[] | null;
}

export interface OnRoomUpdated_werewolfRoomUpdated {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家人数
   */
  playersNumber: number;
  /**
   * 玩家信息
   */
  players: OnRoomUpdated_werewolfRoomUpdated_players[] | null;
  /**
   * 狼人杀游戏配置
   */
  gameConfig: OnRoomUpdated_werewolfRoomUpdated_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface OnRoomUpdated {
  /**
   * 订阅房间变化
   */
  werewolfRoomUpdated: OnRoomUpdated_werewolfRoomUpdated;
}

export interface OnRoomUpdatedVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 游戏类型
 */
export enum GameType {
  Avalon = "Avalon",
  GermanHeartDisease = "GermanHeartDisease",
  UNO = "UNO",
  Undercover = "Undercover",
  Werewolf = "Werewolf",
}

/**
 * 创建游戏配置
 */
export interface InputGameConfig {
  totalNumber: number;
  gameType: GameType;
  lineup?: InputRole[] | null;
}

/**
 * 角色
 */
export interface InputRole {
  name: string;
  count: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
