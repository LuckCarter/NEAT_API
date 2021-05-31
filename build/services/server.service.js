"use strict";

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var config = require("../configs");

var port = config.server.port;

var schema = require('../schemas');

var resolvers = require('../resolvers');

var apiRouter = require('../routes');

var _require = require('apollo-server-express'),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

app.use((0, _cors["default"])());
var graphQlServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers
});
graphQlServer.applyMiddleware({
  app: app,
  path: "/graphql"
});
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);

exports.start = function () {
  app.listen(port, function (err) {
    if (err) {
      console.log("Errors: ".concat(err));
      process.exit(-1);
    }

    console.log("app is runnning on port ".concat(port));
  });
};
//# sourceMappingURL=server.service.js.map