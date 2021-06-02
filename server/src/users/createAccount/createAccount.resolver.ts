import * as bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client },
    ) => {
      // check if userName or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                userName,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error('This username or email is already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};

export default resolvers;
