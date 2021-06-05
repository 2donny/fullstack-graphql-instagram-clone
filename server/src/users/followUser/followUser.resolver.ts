import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { username } });

        if (!ok) {
          return {
            ok: false,
            error: 'User name does not exist.',
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            followings: {
              connect: {
                username
              }
            },
          },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
