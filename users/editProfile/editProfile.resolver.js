import client from "../../client"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
    Mutation: {
        editProfile: async (_, {
            firstName,
            lastName,
            userName,
            email,
            password: newPassword,
        }, {
            loggedUser
        }) => {
            if(!loggedUser) {
                throw Error("")
            }
            let uglyPassword = null;
            if(newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            
            const updatedUser = await client.user.update({
                where: {
                    id: loggedUser.id
                },
                data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(uglyPassword && { password: uglyPassword })
                }
            });
            if(updatedUser) {
                return {
                    ok: true
                }
            }else {
                return {
                    ok: false,
                    error: 'Could not update profile.'
                }
            }
        }
    }
}