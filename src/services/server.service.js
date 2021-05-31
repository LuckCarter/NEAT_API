const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require("../configs");
const port = config.server.port;
const schema = require('../schemas');
const resolvers = require('../resolvers');
const apiRouter = require('../routes');
import cors from "cors";

const { ApolloServer, gql } = require('apollo-server-express');

app.use(cors());

const graphQlServer = new ApolloServer({
  typeDefs : schema,
  resolvers
})

graphQlServer.applyMiddleware({ app, path: "/graphql" });

app.use(bodyParser.json());

app.use('/api/v1', apiRouter);

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};