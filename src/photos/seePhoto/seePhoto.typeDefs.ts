import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhoto(photoId: Int!): Photo
    }
`;