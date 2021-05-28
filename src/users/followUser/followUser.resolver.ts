import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { userName }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { userName } });

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
                userName
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
