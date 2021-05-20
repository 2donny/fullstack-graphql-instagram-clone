require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedUser: await getUser(req.headers.token)
        }
    }
})

const PORT = process.env.PORT

server
    .listen(PORT)
    .then(() => {console.log(`🚀Server is running! Listening on port ${PORT}`)})