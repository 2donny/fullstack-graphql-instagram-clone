import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      console.log(username, password)
      // check username first
      const user = await client.user.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          ok: false,
          error:
            '입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.',
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: '잘못된 비밀번호입니다. 다시 확인하세요.',
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
