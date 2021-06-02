import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.room.findUnique({ where: { id } }).messages(),
    unReadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return null;
      }
      return client.message.count({
        where: {
          roomId: id,
          read: false,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }, _, { client }) => {
      return client.message
        .findUnique({
          where: { id },
        })
        .user();
    },
  },
};

export default resolvers;
