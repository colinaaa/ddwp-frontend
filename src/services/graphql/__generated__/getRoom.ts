/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GameType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getRoom
// ====================================================

export interface getRoom_roomByNumber_players {
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

export interface getRoom_roomByNumber_gameConfig_lineup {
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

export interface getRoom_roomByNumber_gameConfig {
  __typename: "WerewolfConfig";
  /**
   * 总人数
   */
  totalNumber: number;
  /**
   * 阵容
   */
  lineup: getRoom_roomByNumber_gameConfig_lineup[] | null;
}

export interface getRoom_roomByNumber {
  __typename: "WerewolfRoom";
  /**
   * 房间号
   */
  roomNumber: number;
  /**
   * 玩家信息
   */
  players: getRoom_roomByNumber_players[] | null;
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
  gameConfig: getRoom_roomByNumber_gameConfig;
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
  roomByNumber: getRoom_roomByNumber;
}

export interface getRoomVariables {
  roomNumber: number;
}
