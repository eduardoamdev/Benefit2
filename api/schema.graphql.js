const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
  type Query {
    supply: Response
    initialPrice: Response
    soldTokens: Response
  }

  type Mutation {
    createSupply(supply: Float): Response
    createInitialPrice(price: Float): Response
    updateSoldTokens(amount: Float): Response
  }

  type Response {
    success: Boolean
    message: String
  }
`);

module.exports = graphqlSchema;
