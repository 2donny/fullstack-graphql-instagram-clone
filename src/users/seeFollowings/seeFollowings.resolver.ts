import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { userName, lastId }, { client }) => {
      const ok = await client.user.findUnique({ where: { userName } });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      const followings = await client.user
        .findUnique({ where: { userName } })
        .followings({
          ...(lastId && { cursor: { id: lastId }, skip: 1 }),
          take: 5,
        });

      return {
        ok: true,
        followings,
      };
    },
  },
};

export default resolvers;
