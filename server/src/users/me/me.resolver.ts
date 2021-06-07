import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    me: protectedResolver(async (_, __, { client, loggedInUser }) =>
      client.user.findUnique({
        where: { id: loggedInUser.id },
      }),
    ),
  },
};

export default resolvers;
