import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    searchUser: async (_, { keyword, page }, { client }) =>
      client.user.findMany({
        where: {
          userName: {
            mode: 'insensitive',
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: 5 * (page - 1),
      }),
  },
};

export default resolvers;
