import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectedResolver(
      async (_, { roomId }, { client, loggedInUser }) => {
        return client.room.findFirst({
          where: {
            id: roomId,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          }
        });
      },
    ),
  },
};

export default resolvers;
