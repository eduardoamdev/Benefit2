require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./schema.graphql");
const infoResolvers = require("./graphql/resolvers");
const authResolvers = require("./graphql/services");

const port = process.env.PORT;

const app = express();

const createRoot = (...args) => {
  const createdRoot = {};

  for (let i = 0; i < args.length; i++) {
    const resolvers = args[i];

    let resolversKeys = Object.keys(resolvers);

    for (let i = 0; i < resolversKeys.length; i++) {
      let resolverKey = resolversKeys[i];
      createdRoot[resolverKey] = resolvers[resolverKey];
    }
  }

  return createdRoot;
};

const root = createRoot(infoResolvers, authResolvers);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});
