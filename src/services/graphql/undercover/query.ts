import { gql } from 'taro-apollo-client';

const UNDERCOVER_GET_ALL_ROOMS = gql`
  query undercoverRooms {
    undercoverRooms {
      roomNumber
    }
  }
`;

const UNDERCOVER_GET_ROOM = gql`
  query undercoverRoomByNumber($roomNumber: Int!) {
    undercoverRoomByNumber(number: $roomNumber) {
      roomNumber
      players {
        role
        position
      }
      playersNumber
      gameType
      gameConfig {
        totalNumber
        lineup {
          name
          count
        }
      }
      isBegin
      isEnd
    }
  }
`;

const Query = { UNDERCOVER_GET_ALL_ROOMS, UNDERCOVER_GET_ROOM };

export { Query };

export default Query;
