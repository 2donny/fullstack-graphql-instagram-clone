require('dotenv').config();
import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import client from './client';
import logger from 'morgan';
import pubsub from './pubsub';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) { // http 프로토콜로 통신 시 ctx.req가 존재.
      return {
        loggedInUser: await getUser(ctx.req.headers.token as string),
        client,
      };
    } else { // ws 프로토콜로 통신 시 ctx.connection.context로 밑의 subscriptions의 리턴 값에 접근 할 수 있다.
      return {
        loggedInUser: ctx.connection.context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async (params: any) => { // onConnect gives us Reques Headers. This function is called only once, when a users connects to a website. 
      if (!params.token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(params.token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.set('PORT', 4000);
app.use(logger('dev'));
app.use('/static', express.static('uploads'));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(app.get('PORT'), () => {
  console.log(`✅ Server listenting on http://localhost:${app.get('PORT')} 🚀`);
});
