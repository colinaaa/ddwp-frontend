import { gql } from 'taro-apollo-client';

const SHUFFLE = gql`
  mutation shuffle($roomNumber: Int!) {
    deal(roomNumber: $roomNumber) {
      players {
        position
        role
      }
    }
  }
`;

const CREATE_ROOM = gql`
  mutation createRoom($config: InputGameConfig!) {
    createRoom(config: $config) {
      roomNumber
      playersNumber
    }
  }
`;

const Mutation = { CREATE_ROOM, SHUFFLE };

export { Mutation };

export default Mutation;
