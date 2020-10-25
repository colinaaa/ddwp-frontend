import { gql } from 'taro-apollo-client';

const SUB_ROOM_UPDATED = gql`
  subscription OnRoomUpdated($roomNumber: Int!) {
    roomUpdated(roomNumber: $roomNumber) {
      roomNumber
      playersNumber
      players {
        position
      }
    }
  }
`;

const Subscription = { SUB_ROOM_UPDATED };

export { Subscription };

export default Subscription;
