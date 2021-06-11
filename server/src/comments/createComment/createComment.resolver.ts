import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { client, loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: '사진이 존재하지 않습니다.',
          };
        }
        const commentId = await client.comment.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photoId,
              },
            },
          },
          select: {
            id: true
          }
        });
        
        return {
            ok: true,
            id: commentId.id
        }
      },
    ),
  },
};

export default resolvers;
