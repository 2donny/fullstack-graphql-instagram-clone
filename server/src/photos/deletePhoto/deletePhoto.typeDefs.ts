import { gql } from "apollo-server";

export default gql`
    type Mutation {
        deletePhoto(photoId: Int!): MutationResponse!
    }
`;