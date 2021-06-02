import { protectedResolver } from './../../users/users.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    toggleLikePhoto: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const ok = await client.photo.findUnique({ where: { id } });
        if (!ok) {
          return {
            ok: false,
            error: '사진이 존재하지 않습니다.',
          };
        }

        const likeWhere = {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        };

        const like = await client.like.findUnique({
          where: likeWhere
        });

        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
          return {
            ok: true,
          };
        } else {
          await client.like.create({
            data: {
              photo: {
                connect: { id },
              },
              user: {
                connect: { id: loggedInUser.id },
              },
            },
          });
          return {
            ok: true,
          };
        }
      },
    ),
  },
};

export default resolvers;
