import { gql } from 'taro-apollo-client';

const GET_ALL_ROOMS = gql`
  query getAllRooms {
    allRooms {
      roomNumber
    }
  }
`;

const Query = { GET_ALL_ROOMS };

export default Query;
