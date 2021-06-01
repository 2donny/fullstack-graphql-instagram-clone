import { gql } from "apollo-server";

export default gql`
    type uploadPhotoResult {
        ok: Boolean!
        error: String
        photo: Photo
    }
    type Mutation {
        uploadPhoto(file: Upload!, caption: String): uploadPhotoResult
    }
`;