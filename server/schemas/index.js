//imports
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { gql } = require('apollo-server-express');

// exports
module.exports = { typeDefs, resolvers }