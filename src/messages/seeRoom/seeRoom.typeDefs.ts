import { gql } from "apollo-server";

export default gql`
    type Query {
        seeRoom(roomId: Int!): Room
    }
`;