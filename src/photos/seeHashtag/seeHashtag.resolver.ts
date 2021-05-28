import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};

export default resolvers;
