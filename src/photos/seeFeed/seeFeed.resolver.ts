import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(
      async (_, { page }, { client, loggedInUser }) => {
        const photo = await client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id
              },
            ],
          },
          take: 5,
          skip: 5 * (page - 1),
          orderBy: {
            createdAt: 'desc',
          },
        });
        return photo;
      },
    ),
  },
};

export default resolvers;
