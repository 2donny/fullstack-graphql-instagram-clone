import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      bio: String
      avatar: Upload
      email: String
      password: String
    ): EditProfileResult!
  }
`;
