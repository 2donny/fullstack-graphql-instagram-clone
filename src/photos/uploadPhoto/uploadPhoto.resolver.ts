import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        let hashtagsObj = null;
        if (caption) {
          hashtagsObj = processHashtags(caption);
        }
        const photo = await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagsObj && {
              hashtags: { 
                connectOrCreate: hashtagsObj 
              },
            }),
          },
        });

        return {
          ok: true,
          photo
        }
      },
    ),
  },
};

export default resolvers;
