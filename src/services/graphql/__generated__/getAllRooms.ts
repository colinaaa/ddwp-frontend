/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRooms
// ====================================================

export interface getAllRooms_allRooms {
  __typename: "Room";
  /**
   * 房间号
   */
  roomNumber: number;
}

export interface getAllRooms {
  allRooms: getAllRooms_allRooms[] | null;
}
