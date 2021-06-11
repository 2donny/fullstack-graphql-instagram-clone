import { gql } from "apollo-server";

export default gql`
    type Mutation {
        deleteComment(commentId: Int!): MutationResponse!
    }
`;