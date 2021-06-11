import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    followings: [User]
    photos(page: Int!): [Photo]
    totalFollowings: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
