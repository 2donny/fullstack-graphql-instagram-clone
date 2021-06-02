import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    toggleLikePhoto(id: Int!): MutationResponse!
  }
`;
