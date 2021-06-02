import { gql } from 'apollo-server';

export default gql`
  type Room {
    id: Int!
    users: [User]!
    messages: [Message]!
    unReadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Message {
    id: Int!
    user: User!
    room: Room!
    payload: String!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
