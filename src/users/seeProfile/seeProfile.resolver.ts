import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { userName }, { client }) =>
      await client.user.findUnique({
        where: { userName }
      }),
  },
};

export default resolvers;
