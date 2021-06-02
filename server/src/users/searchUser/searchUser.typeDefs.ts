import { gql } from "apollo-server";

export default gql`
    type Mutation {
        searchUser(keyword: String!, page: Int!): [User]
    }
`;