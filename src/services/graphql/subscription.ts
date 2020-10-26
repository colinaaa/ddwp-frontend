import { gql } from 'taro-apollo-client';

const SUB_ROOM_UPDATED = gql`
  subscription OnRoomUpdated($roomNumber: Int!) {
    roomUpdated(roomNumber: $roomNumber) {
      roomNumber
      playersNumber
      players {
        position
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

const Subscription = { SUB_ROOM_UPDATED };

export { Subscription };

export default Subscription;
