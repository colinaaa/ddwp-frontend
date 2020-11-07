import { gql } from 'taro-apollo-client';

const UNDERCOVER_SUB_ROOM_UPDATED = gql`
  subscription UndercoverOnRoomUpdated($roomNumber: Int!) {
    undercoverRoomByNumber(roomNumber: $roomNumber) {
      roomNumber
      playersNumber
      players {
        position
        role
      }
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

const Subscription = { UNDERCOVER_SUB_ROOM_UPDATED };

export { Subscription };

export default Subscription;
