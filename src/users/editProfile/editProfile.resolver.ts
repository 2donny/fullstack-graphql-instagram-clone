import * as bcrypt from 'bcrypt';
import {
    protectedResolver
} from "../users.utils";
import { Resolver } from '../../types';
import { createWriteStream } from 'fs';

const resolverFn: Resolver = async (_, {
    firstName,
    lastName,
    userName,
    email,
    password: newPassword,
    bio,
    avatar,
}, {
    loggedUser,
    client
}) => {
    const { filename, createReadStream } = await avatar;
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + '/uploads/' + filename);
    readStream.pipe(writeStream);

    let uglyPassword = null;
    if (newPassword) {
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
            bio,
            ...(uglyPassword && {
                password: uglyPassword
            })
        }
    });
    if (updatedUser) {
        return {
            ok: true
        }
    } else {
        return {
            ok: false,
            error: 'Could not update profile.'
        }
    }
}

export default {
    Mutation: {
        editProfile:  protectedResolver(resolverFn),
    }
}