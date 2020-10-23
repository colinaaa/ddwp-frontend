/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_createRoom {
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

export interface createRoom {
  /**
   * 创建房间
   */
  createRoom: createRoom_createRoom;
}
