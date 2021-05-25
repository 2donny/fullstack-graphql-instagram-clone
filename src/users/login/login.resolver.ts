import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { userName, password }, { client }) => {
      // check username first
      const user = await client.user.findFirst({
        where: {
          userName,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password.',
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
