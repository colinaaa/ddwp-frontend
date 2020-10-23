import { gql } from 'taro-apollo-client';

const CREATE_ROOM = gql`
  mutation createRoom {
    createRoom(
      config: { totalNumber: 12, gameType: Werewolf, lineup: [{ name: "abcd", count: 3 }, { name: "efgh", count: 10 }] }
    ) {
      roomNumber
      playersNumber
    }
  }
`;

const Mutation = { CREATE_ROOM };

export { Mutation };

export default Mutation;
