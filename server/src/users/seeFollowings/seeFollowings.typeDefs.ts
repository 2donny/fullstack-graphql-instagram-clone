import { gql } from 'apollo-server';

export default gql`
  type seeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User]
  }
  type Query {
    seeFollowings(userName: String!, lastId: Int): seeFollowingsResult!
  }
`;
