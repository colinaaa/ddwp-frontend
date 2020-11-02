import { gql } from 'taro-apollo-client';

const WEREWOLF_SUB_ROOM_UPDATED = gql`
  subscription OnRoomUpdated($roomNumber: Int!) {
    werewolfRoomUpdated(roomNumber: $roomNumber) {
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

const Subscription = { WEREWOLF_SUB_ROOM_UPDATED };

export { Subscription };

export default Subscription;
