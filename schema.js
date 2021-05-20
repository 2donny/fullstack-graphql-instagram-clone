const {
    loadFilesSync,
    mergeTypeDefs,
    mergeResolvers
} = require("graphql-tools");
const {
    makeExecutableSchema
} = require("apollo-server");

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolver.js`)

const typeDefs = mergeTypeDefs(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

export default schema;