import { gql } from 'apollo-server';

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      name: String!
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;
