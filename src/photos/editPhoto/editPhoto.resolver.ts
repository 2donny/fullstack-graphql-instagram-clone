import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const oldPhoto = await client.photo.findUnique({
          where: { id },
          include: {
              hashtags: {
                select: {
                  hashtag: true
                }
              }
          },
        });
        if (!oldPhoto) {
          return {
            ok: false,
            error: "Can't found photo id.",
          };
        }
        const hashtagObj = processHashtags(caption);
        
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              ...(hashtagObj && { connectOrCreate: hashtagObj}),
            },
          },
        });

        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
