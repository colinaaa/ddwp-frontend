/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: undercoverSelectPos
// ====================================================

export interface undercoverSelectPos_undercoverSelectPos_players {
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

export interface undercoverSelectPos_undercoverSelectPos {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: undercoverSelectPos_undercoverSelectPos_players[];
}

export interface undercoverSelectPos {
  /**
   * 选择位置
   */
  undercoverSelectPos: undercoverSelectPos_undercoverSelectPos;
}

export interface undercoverSelectPosVariables {
  pos: number;
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: undercoverDeal
// ====================================================

export interface undercoverDeal_undercoverDeal_players {
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

export interface undercoverDeal_undercoverDeal {
  __typename: "UnderCoverRoom";
  /**
   * 玩家信息
   */
  players: undercoverDeal_undercoverDeal_players[];
}

export interface undercoverDeal {
  /**
   * 开始发牌
   */
  undercoverDeal: undercoverDeal_undercoverDeal;
}

export interface undercoverDealVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: undercoverEndGame
// ====================================================

export interface undercoverEndGame_undercoverEndGame {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface undercoverEndGame {
  /**
   * 结束游戏
   */
  undercoverEndGame: undercoverEndGame_undercoverEndGame;
}

export interface undercoverEndGameVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: undercoverJoinRoom
// ====================================================

export interface undercoverJoinRoom_undercoverJoinRoom_players {
  __typename: "Player";
  /**
   * 位置
   */
  position: number;
}

export interface undercoverJoinRoom_undercoverJoinRoom {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: undercoverJoinRoom_undercoverJoinRoom_players[];
  /**
   * 玩家人数
   */
  playersNumber: number;
}

export interface undercoverJoinRoom {
  /**
   * 加入房间
   */
  undercoverJoinRoom: undercoverJoinRoom_undercoverJoinRoom;
}

export interface undercoverJoinRoomVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: undercoverCreateRoom
// ====================================================

export interface undercoverCreateRoom_undercoverCreateRoom {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家人数
   */
  playersNumber: number;
}

export interface undercoverCreateRoom {
  /**
   * 创建房间
   */
  undercoverCreateRoom: undercoverCreateRoom_undercoverCreateRoom;
}

export interface undercoverCreateRoomVariables {
  config: InputGameConfig;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: undercoverRooms
// ====================================================

export interface undercoverRooms_undercoverRooms {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface undercoverRooms {
  undercoverRooms: undercoverRooms_undercoverRooms[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: undercoverRoomByNumber
// ====================================================

export interface undercoverRoomByNumber_undercoverRoomByNumber_players {
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

export interface undercoverRoomByNumber_undercoverRoomByNumber_gameConfig_lineup {
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

export interface undercoverRoomByNumber_undercoverRoomByNumber_gameConfig {
  __typename: "UnderCoverConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: undercoverRoomByNumber_undercoverRoomByNumber_gameConfig_lineup[] | null;
}

export interface undercoverRoomByNumber_undercoverRoomByNumber {
  __typename: "UnderCoverRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: undercoverRoomByNumber_undercoverRoomByNumber_players[];
  /**
   * 玩家人数
   */
  playersNumber: number;
  /**
   * 游戏类型
   */
  gameType: GameType;
  /**
   * 谁是卧底游戏配置
   */
  gameConfig: undercoverRoomByNumber_undercoverRoomByNumber_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface undercoverRoomByNumber {
  /**
   * 查询房间
   */
  undercoverRoomByNumber: undercoverRoomByNumber_undercoverRoomByNumber;
}

export interface undercoverRoomByNumberVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: UndercoverOnRoomUpdated
// ====================================================

export interface UndercoverOnRoomUpdated_undercoverRoomByNumber_players {
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

export interface UndercoverOnRoomUpdated_undercoverRoomByNumber_gameConfig_lineup {
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

export interface UndercoverOnRoomUpdated_undercoverRoomByNumber_gameConfig {
  __typename: "UnderCoverConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: UndercoverOnRoomUpdated_undercoverRoomByNumber_gameConfig_lineup[] | null;
}

export interface UndercoverOnRoomUpdated_undercoverRoomByNumber {
  __typename: "UnderCoverRoom";
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
  players: UndercoverOnRoomUpdated_undercoverRoomByNumber_players[];
  /**
   * 谁是卧底游戏配置
   */
  gameConfig: UndercoverOnRoomUpdated_undercoverRoomByNumber_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface UndercoverOnRoomUpdated {
  /**
   * 订阅房间变化
   */
  undercoverRoomByNumber: UndercoverOnRoomUpdated_undercoverRoomByNumber;
}

export interface UndercoverOnRoomUpdatedVariables {
  roomNumber: number;
}

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
  players: werewolfSelectPos_werewolfSelectPos_players[];
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
  players: werewolfDeal_werewolfDeal_players[];
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
  players: werewolfJoinRoom_werewolfJoinRoom_players[];
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
// GraphQL query operation: werewolfRooms
// ====================================================

export interface werewolfRooms_werewolfRooms {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface werewolfRooms {
  werewolfRooms: werewolfRooms_werewolfRooms[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: werewolfRoomByNumber
// ====================================================

export interface werewolfRoomByNumber_werewolfRoomByNumber_players {
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

export interface werewolfRoomByNumber_werewolfRoomByNumber_gameConfig_lineup {
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

export interface werewolfRoomByNumber_werewolfRoomByNumber_gameConfig {
  __typename: "WerewolfConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: werewolfRoomByNumber_werewolfRoomByNumber_gameConfig_lineup[] | null;
}

export interface werewolfRoomByNumber_werewolfRoomByNumber {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: werewolfRoomByNumber_werewolfRoomByNumber_players[];
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
  gameConfig: werewolfRoomByNumber_werewolfRoomByNumber_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface werewolfRoomByNumber {
  /**
   * 查询房间
   */
  werewolfRoomByNumber: werewolfRoomByNumber_werewolfRoomByNumber;
}

export interface werewolfRoomByNumberVariables {
  roomNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WerewolfOnRoomUpdated
// ====================================================

export interface WerewolfOnRoomUpdated_werewolfRoomByNumber_players {
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

export interface WerewolfOnRoomUpdated_werewolfRoomByNumber_gameConfig_lineup {
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

export interface WerewolfOnRoomUpdated_werewolfRoomByNumber_gameConfig {
  __typename: "WerewolfConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: WerewolfOnRoomUpdated_werewolfRoomByNumber_gameConfig_lineup[] | null;
}

export interface WerewolfOnRoomUpdated_werewolfRoomByNumber {
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
  players: WerewolfOnRoomUpdated_werewolfRoomByNumber_players[];
  /**
   * 狼人杀游戏配置
   */
  gameConfig: WerewolfOnRoomUpdated_werewolfRoomByNumber_gameConfig;
  /**
   * 是否开始
   */
  isBegin: boolean | null;
  /**
   * 是否结束
   */
  isEnd: boolean | null;
}

export interface WerewolfOnRoomUpdated {
  /**
   * 订阅房间变化
   */
  werewolfRoomByNumber: WerewolfOnRoomUpdated_werewolfRoomByNumber;
}

export interface WerewolfOnRoomUpdatedVariables {
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
