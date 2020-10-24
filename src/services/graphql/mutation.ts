import { gql } from 'taro-apollo-client';

const CREATE_ROOM = gql`
  mutation createRoom($config: InputGameConfig!) {
    createRoom(config: $config) {
      roomNumber
      playersNumber
    }
  }
`;

const Mutation = { CREATE_ROOM };

export { Mutation };

export default Mutation;
