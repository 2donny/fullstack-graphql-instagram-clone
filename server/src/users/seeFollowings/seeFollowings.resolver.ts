import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { username, lastId }, { client }) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      const followings = await client.user
        .findUnique({ where: { username } })
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
