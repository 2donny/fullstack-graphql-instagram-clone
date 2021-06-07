import client from '../client';
import { Resolvers } from '../types';
import { protectedResolver } from '../users/users.utils';

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
    likes: ({ id }, _, { client }) =>
      client.like.count({
        where: {
          photoId: id,
        },
      }),
    isMine: protectedResolver(
      async ({ userId }, _, { client, loggedInUser }) => {
        return userId === loggedInUser.id;
      },
    ),
    isLiked: protectedResolver(async ({ id }, _, { client, loggedInUser }) => {
      const liked = await client.photo.findFirst({
        where: {
          id,
          likes: {
            some: {
              userId: loggedInUser.id,
            },
          },
        },
      });
      if (liked) return true;
      else return false;
    }),
    commentNumber: async ({ id }, _, { client }) => {
      const comments = await client.photo
        .findUnique({ where: { id }, select: { id: true } })
        .comments();
      return comments.length;
    },
    comment: async ({ id }, _, { client }) => {
      const comments = await client.photo
        .findUnique({ where: { id } })
        .comments({
          include: {
            user: true,
          },
        });
      return comments;
    },
  },
  Hashtag: {
    photos: async ({ id }, { page }) => {
      return client.hashtag.findUnique({ where: { id } }).photos({
        take: 5,
        skip: 5 * (page - 1),
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
