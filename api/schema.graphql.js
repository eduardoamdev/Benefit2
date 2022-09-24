const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
  type Query {
    login: String
    totalSupply: String
    soldTokens: String
  }

  type Mutation {
    signup: String
  }
`);

module.exports = graphqlSchema;
