import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchPhoto: (_, { keyword, page }, { client }) =>
      client.photo.findMany({
        where: {
          caption: {
            mode: 'insensitive',
            startsWith: keyword,
          },
        },
        take: 5,
        skip: 5 * (page - 1),
      }),
  },
};

export default resolvers;
