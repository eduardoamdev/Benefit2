require("dotenv").config();
const express = require("express");
const database = require("./db");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./schema.graphql");
const SupplyResolvers = require("./graphql/resolvers/supply");
const SoldTokensResolvers = require("./graphql/resolvers/soldTokens");
const InitialPriceResolvers = require("./graphql/resolvers/initialPrice");
const createRoot = require("./resources/createRoot");

const port = process.env.PORT;

const app = express();

database.connect((error) => {
  if (!error) {
    const db = database.get();

    const supply = new SupplyResolvers(db);
    const supplyResolvers = supply.resolvers;

    const initialPrice = new InitialPriceResolvers(db);
    const initialPriceResolvers = initialPrice.resolvers;

    const soldTokens = new SoldTokensResolvers(db);
    const soldTokensResolvers = soldTokens.resolvers;

    const graphqlRoot = createRoot(
      supplyResolvers,
      soldTokensResolvers,
      initialPriceResolvers
    );

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlRoot,
        graphiql: true,
      })
    );

    app.listen(port, () => {
      console.log(`Server runing on port: ${port}`);
    });
  } else {
    console.log(`Database connection error: ${error}`);
  }
});
