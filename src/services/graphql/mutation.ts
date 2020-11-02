import { gql } from 'taro-apollo-client';

const WEREWOLF_SELECT_POSITION = gql`
  mutation werewolfSelectPos($pos: Int!, $roomNumber: Int!) {
    werewolfSelectPos(position: $pos, roomNumber: $roomNumber) {
      roomNumber
      players {
        role
        position
      }
    }
  }
`;

const WEREWOLF_SHUFFLE = gql`
  mutation werewolfDeal($roomNumber: Int!) {
    werewolfDeal(roomNumber: $roomNumber) {
      players {
        position
        role
      }
    }
  }
`;

const WEREWOLF_END_GAME = gql`
  mutation werewolfEndGame($roomNumber: Int!) {
    werewolfEndGame(roomNumber: $roomNumber) {
      roomNumber
    }
  }
`;

const WEREWOLF_JOIN_ROOM = gql`
  mutation werewolfJoinRoom($roomNumber: Int!) {
    werewolfJoinRoom(roomNumber: $roomNumber) {
      roomNumber
      players {
        position
      }
      playersNumber
    }
  }
`;

const WEREWOLF_CREATE_ROOM = gql`
  mutation werewolfCreateRoom($config: InputGameConfig!) {
    werewolfCreateRoom(config: $config) {
      roomNumber
      playersNumber
    }
  }
`;

const Mutation = {
  WEREWOLF_CREATE_ROOM,
  WEREWOLF_SHUFFLE,
  WEREWOLF_SELECT_POSITION,
  WEREWOLF_JOIN_ROOM,
  WEREWOLF_END_GAME,
};

export { Mutation };

export default Mutation;
