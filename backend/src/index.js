const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const { prisma } = require("./database.js");

const port = process.env.PORT || 9090;

const server = new ApolloServer({ resolvers, typeDefs, context: async ({req}) => ({
    authorization: req.headers.authorization
}) });

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`)); 