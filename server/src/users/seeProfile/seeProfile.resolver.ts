import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client }) =>
      await client.user.findUnique({
        where: { username }
      }),
  },
};

export default resolvers;
