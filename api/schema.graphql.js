const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
  type Query {
    login: String
    supply: Response
    soldTokens: String
  }

  type Mutation {
    signup: String
  }

  type Response {
    success: Boolean
    info: Int
  }
`);

module.exports = graphqlSchema;
