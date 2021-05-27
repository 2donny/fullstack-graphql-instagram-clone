import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { userName, page }, { client }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({
          skip: 5 * (page - 1),
          take: 5,
        });

      const totalFollowers = await client.user.count({
        where: {
          followings: {
            some: {
              userName,
            },
          },
        },
      });

      return {
        ok: true,
        followers,
        totalPage: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

export default resolvers;
