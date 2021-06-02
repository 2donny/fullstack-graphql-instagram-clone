const {
    loadFilesSync,
    mergeTypeDefs,
    mergeResolvers
} = require("graphql-tools");

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolver.{js,ts}`)

export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)
