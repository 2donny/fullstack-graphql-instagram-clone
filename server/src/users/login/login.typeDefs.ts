import { gql } from 'apollo-server';

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(userName: String!, password: String!): LoginResult!
  }
`;
