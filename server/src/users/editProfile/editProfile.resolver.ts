import * as bcrypt from 'bcrypt';
import {
    protectedResolver
} from "../users.utils";
import { Resolver } from '../../types';
import { createWriteStream } from 'fs';
import { uploadToS3 } from '../../shared/shared.utils';

const resolverFn: Resolver = async (_, {
    firstName,
    lastName,
    userName,
    email,
    password: newPassword,
    bio,
    avatar,
}, {
    loggedInUser,
    client
}) => {
    let avatarUrl = null;
    if(avatar) {
        avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
        // const { filename, createReadStream } = await avatar;
        // const uniqueFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        // const readStream = createReadStream();
        // const writeStream = createWriteStream(process.cwd() + '/uploads/' + uniqueFilename);
        // readStream.pipe(writeStream);
        // avatarUrl = `http://localhost:4000/static/${uniqueFilename}`
    }

    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id
        },
        data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            avatar: avatar && avatarUrl,
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