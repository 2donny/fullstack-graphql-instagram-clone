require('dotenv').config();
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import client from './client';
import * as logger from 'morgan';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
app.use(logger('dev'));
app.use(express.static('uploads'))
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀Server is running! Listening on port ${process.env.PORT}`);
});