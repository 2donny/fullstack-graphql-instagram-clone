import { gql } from "apollo-server";

export default gql`
    type FollowUserResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        followUser(userName: String): FollowUserResult!
    }
`;