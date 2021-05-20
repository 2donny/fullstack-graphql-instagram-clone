import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
    Mutation: {
        login: async (_, { userName, password }) => {
            // check username first
            const user = await client.user.findFirst({
                where: {
                    userName
                }
            })
            if(!user){
                return {
                    ok: false,
                    error: 'User not found.'
                }
            }
            // check password with args.password
            const passwordOk = bcrypt.compare(password, user.password);
            if(!passwordOk) {
                return {
                    ok: false,
                    error: 'Incorrect password.'
                }
            }
            const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token
            }

        },
    }
}