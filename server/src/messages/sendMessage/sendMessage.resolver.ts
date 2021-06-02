import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import pubsub from '../../pubsub';
import { NEW_MESSAGE } from '../../constants';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { roomId, userId, payload }, { client, loggedInUser }) => {
        let room = null;
        if (roomId) {
          // See whethere roomId is existing.
          const room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) {
            return {
              ok: false,
              error: '방을 찾을 수 없습니다.',
            };
          }
        } else {
          // Check whether user is existing first.
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) {
            return {
              ok: false,
              error: '이 유저는 존재하지 않습니다.',
            };
          }
          // Create room.
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: loggedInUser.id,
                  },
                  {
                    id: userId,
                  },
                ],
              },
            },
            select: {
              id: true,
            },
          });
        }

        // Send messages to that room.
        const message = await client.message.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            room: {
              connect: {
                id: roomId ? roomId : room.id,
              },
            },
          },
        });

        pubsub.publish(NEW_MESSAGE, {
          roomUpdates: { ...message },
        });

        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
