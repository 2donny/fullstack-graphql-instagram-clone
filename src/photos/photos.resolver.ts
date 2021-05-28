import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) => {
      return await client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    photos: async ({ id }, { page }) => {
      return client.hashtag.findUnique({ where: { id } }).photos({
          take: 5,
          skip: 5 * (page-1)
      });
    },
    totalPhotos: async ({ hashtag }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              hashtag,
            },
          },
        },
      }),
  },
};

export default resolvers;
