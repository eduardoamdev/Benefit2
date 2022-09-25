const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
  type Query {
    supply: Response
    soldTokens: Response
  }

  type Mutation {
    createSupply(supply: Float): Response
    updateSoldTokens(amount: Int): Response
  }

  type Response {
    success: Boolean
    message: String
  }
`);

module.exports = graphqlSchema;
