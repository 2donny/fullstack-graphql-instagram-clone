import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id, page }, { client }) => {
        const likes = await client.like.findMany({
          where: { photoId: id },
          select: {
              user: true
          },
          take: 5,
          skip: 5 * (page - 1),
        });
        return likes.map(like => like.user);
    }
  },
};

export default resolvers;
