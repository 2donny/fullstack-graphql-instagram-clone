import * as jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver } from '../types';

export const getUser = async (token: string) => {
  try {
    if (!token) return null;

    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ('id' in verifiedToken) {
      const user = await client.user.findUnique({
        where: {
          id: verifiedToken['id'],
        },
      });
      if (user) return user;
      else return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = (ourResolver: Resolver) => (
  root: any,
  args: any,
  context: any,
  info: any,
) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'You need to login.',
    };
  }
  return ourResolver(root, args, context, info);
};
