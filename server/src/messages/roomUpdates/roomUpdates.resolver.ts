import pubsub from '../../pubsub';
import { NEW_MESSAGE } from '../../constants';
import { withFilter } from 'apollo-server-express';
import client from '../../client';
import { SubscriptionResolvers } from '../../types';

const resolvers: SubscriptionResolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error(
            '해당 채팅방이 존재하지 않거나, 접근 권한이 없습니다.',
          );
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { id }, { loggedInUser }) => { // If second function returns true, then User will get updated data.
            return roomUpdates.roomId === id;
          },
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
