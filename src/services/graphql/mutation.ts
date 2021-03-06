import { gql } from 'taro-apollo-client';

const SELECT_POSITION = gql`
  mutation selectPosition($pos: Int!, $roomNumber: Int!) {
    selectPosition(position: $pos, roomNumber: $roomNumber) {
      roomNumber
      players {
        role
        position
      }
    }
  }
`;

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

const END_GAME = gql`
  mutation endGame($roomNumber: Int!) {
    endGame(roomNumber: $roomNumber) {
      roomNumber
    }
  }
`;

const JOIN_ROOM = gql`
  mutation joinRoom($roomNumber: Int!) {
    joinRoom(roomNumber: $roomNumber) {
      roomNumber
      players {
        position
      }
      playersNumber
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

const Mutation = { CREATE_ROOM, SHUFFLE, SELECT_POSITION, JOIN_ROOM, END_GAME };

export { Mutation };

export default Mutation;
