import dotenv from "dotenv";
import express from "express";
import database from "./db.mjs";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./schema.graphql.mjs";
import SupplyResolvers from "./graphql/resolvers/supply.mjs";
import SoldTokensResolvers from "./graphql/resolvers/soldTokens.mjs";
import InitialPriceResolvers from "./graphql/resolvers/initialPrice.mjs";
import ContractBalanceResolvers from "./graphql/resolvers/contractBalance.mjs";
import createRoot from "./resources/createRoot.mjs";
import authorization from "./middlewares/authorization.mjs";

const port = dotenv.config().parsed.PORT;

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

    const contractBalance = new ContractBalanceResolvers(db);
    const contractBalanceResolvers = contractBalance.resolvers;

    const graphqlRoot = createRoot(
      supplyResolvers,
      soldTokensResolvers,
      initialPriceResolvers,
      contractBalanceResolvers
    );

    app.use(authorization);

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
