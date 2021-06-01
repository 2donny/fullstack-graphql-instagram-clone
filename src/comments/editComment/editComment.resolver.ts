import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return {
            ok: false,
            error: '댓글이 존재하지 않습니다.',
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: '권한이 없습니다.',
          };
        } else {
          await client.comment.update({
            where: { id },
            data: { payload },
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
