import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { createWriteStream } from 'fs';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        let hashtagsObj = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          console.log(hashtags);
          hashtagsObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }

        return await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagsObj.length !== 0 && { hashtags: { connectOrCreate: hashtagsObj } }),
          },
        });

        // const { filename, createReadStream } = await file;
        // const uniquePhotoName = `${loggedInUser.id}-${Date.now()}-${filename}`;
        // const readStream = createReadStream();
        // const writeStream = createWriteStream(process.cwd() + '/uploads/' + uniquePhotoName);
        // readStream.pipe(writeStream);
        // const photoUrl = `http://localhost:4000/static/${uniquePhotoName}`;
      },
    ),
  },
};

export default resolvers;
