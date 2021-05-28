import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    totalFollowings: ({ id }, _, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({ where: { followings: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => loggedInUser?.id === id,
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const cnt = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          followings: {
            some: {
              id,
            },
          },
        },
      });

      return cnt === 0 ? false : true;
    },
    photos: ({ id }, { page }, { client }) =>
      client.user
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: 5 * (page - 1),
        }),
  },
};

export default resolvers;
