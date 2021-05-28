import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const ok = client.photo.findUnique({ where: { id } });
        if (!ok) {
          return {
            ok: false,
            error: "Can't found photo id.",
          };
        }
        const hashtagArr = caption.match(/#[\w]+/g);

        const prevHashtagArr = await client.photo
          .findUnique({ where: { id } })
          .hashtags();

        console.log(prevHashtagArr);

        await client.photo.update({
          where: { id },
          data: {
            caption,
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
