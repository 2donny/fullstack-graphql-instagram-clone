require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import client from './client';
import logger from 'morgan';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token as string),
      client,
    };
  },
}); 

const app = express();
app.set('PORT', 4000);
app.use(logger('dev'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'))

app.listen({ port: app.get('PORT') }, () => {
  console.log(`🚀Server is running! Listening on port ${app.get('PORT')}`);
});