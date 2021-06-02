import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { CommentId }, { client, prismaDelete, loggedInUser }) => {
        const Comment = await client.comment.findUnique({
          where: { id: CommentId },
          select: { userId: true },
        });
        if (!Comment) {
          return {
            ok: false,
            error: '댓글이 존재하지 않습니다.',
          };
        } else if (Comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: '권한이 없습니다.',
          };
        }

        await client.comment.delete({
          where: {
            id: CommentId
          }
        });
        
        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
