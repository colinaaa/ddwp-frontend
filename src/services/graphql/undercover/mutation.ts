import { gql } from 'taro-apollo-client';

const UNDERCOVER_SELECT_POSITION = gql`
  mutation undercoverSelectPos($pos: Int!, $roomNumber: Int!) {
    undercoverSelectPos(position: $pos, roomNumber: $roomNumber) {
      roomNumber
      players {
        role
        position
      }
    }
  }
`;

const UNDERCOVER_SHUFFLE = gql`
  mutation undercoverDeal($roomNumber: Int!) {
    undercoverDeal(roomNumber: $roomNumber) {
      players {
        position
        role
      }
    }
  }
`;

const UNDERCOVER_END_GAME = gql`
  mutation undercoverEndGame($roomNumber: Int!) {
    undercoverEndGame(roomNumber: $roomNumber) {
      roomNumber
    }
  }
`;

const UNDERCOVER_JOIN_ROOM = gql`
  mutation undercoverJoinRoom($roomNumber: Int!) {
    undercoverJoinRoom(roomNumber: $roomNumber) {
      roomNumber
      players {
        position
      }
      playersNumber
    }
  }
`;

const UNDERCOVER_CREATE_ROOM = gql`
  mutation undercoverCreateRoom($config: InputGameConfig!) {
    undercoverCreateRoom(config: $config) {
      roomNumber
      playersNumber
    }
  }
`;

const Mutation = {
  UNDERCOVER_CREATE_ROOM,
  UNDERCOVER_SHUFFLE,
  UNDERCOVER_SELECT_POSITION,
  UNDERCOVER_JOIN_ROOM,
  UNDERCOVER_END_GAME,
};

export { Mutation };

export default Mutation;
