import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePhoto: async (_, { photoId }, { client }) =>
      client.photo.findUnique({ where: { id: photoId } }),
  },
};

export default resolvers;
