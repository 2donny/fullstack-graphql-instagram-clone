import { Resolvers } from '../types';
import { protectedResolver } from '../users/users.utils';

const resolvers: Resolvers = {
  Comment: {
    isMine: protectedResolver(
      async ({ userId }, _, { loggedInUser }) => {
        return userId === loggedInUser.id;
      },
    ),
  },
};

export default resolvers;
