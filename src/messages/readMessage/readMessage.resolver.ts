import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const message = await client.message.findFirst({
          where: {
            id,
            user: {
              id: {
                not: loggedInUser.id,
              },
            },
            room: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!message) {
          return {
            ok: false,
            error: '메시지를 찾을 수 없습니다.',
          };
        }

        await client.message.update({
          where: {
            id
          },
          data: {
            read: true,
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
