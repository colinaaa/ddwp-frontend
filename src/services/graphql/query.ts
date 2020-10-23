import { gql } from 'taro-apollo-client';
import { getRoom, getRoomVariables } from './__generated__/getRoom';
import { getAllRooms } from './__generated__/getAllRooms';

const GET_ALL_ROOMS = gql`
  query getAllRooms {
    allRooms {
      roomNumber
    }
  }
`;

const GET_ROOM = gql`
  query getRoom($roomNumber: Int!) {
    roomByNumber(number: $roomNumber) {
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

const Query = { GET_ALL_ROOMS, GET_ROOM };

export { getRoom, getRoomVariables, getAllRooms, GET_ALL_ROOMS, GET_ROOM, Query };

export default Query;
