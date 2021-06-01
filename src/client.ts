import { PrismaClient } from '@prisma/client';
import { PrismaDelete } from '@paljs/plugins';

const client = new PrismaClient();
export default client;

