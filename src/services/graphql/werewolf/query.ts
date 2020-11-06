import { gql } from 'taro-apollo-client';

const WEREWOLF_GET_ALL_ROOMS = gql`
  query werewolfRooms {
    werewolfRooms {
      roomNumber
    }
  }
`;

const WEREWOLF_GET_ROOM = gql`
  query werewolfRoomByNumber($roomNumber: Int!) {
    werewolfRoomByNumber(number: $roomNumber) {
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

const Query = { WEREWOLF_GET_ALL_ROOMS, WEREWOLF_GET_ROOM };

export { Query };

export default Query;
