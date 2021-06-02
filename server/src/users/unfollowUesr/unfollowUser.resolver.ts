import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { client, loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { userName } });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user.",
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id},
          data: {
            followings: {
              disconnect: {
                userName
              }
            }
          }
        })
        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
