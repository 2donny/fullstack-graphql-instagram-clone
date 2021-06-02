import { gql } from "apollo-server";

export default gql`
    type Mutation {
        deleteComment(CommentId: Int!): MutationResponse!
    }
`;