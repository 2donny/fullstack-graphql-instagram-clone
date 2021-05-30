import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { photoId, page }, { client }) => {
        const comments = await client.photo.findUnique({
            where: { id: photoId },
        }).comments({
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            skip: 10 * (page - 1)
        });
        return comments;
    }
  }
}

export default resolvers;