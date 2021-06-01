import { User, PrismaClient } from '@prisma/client';
import { PrismaDelete } from '@paljs/plugins';

type Context = {
  loggedInUser: User;
  client: PrismaClient
  prismaDelete: PrismaDelete
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any,
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};