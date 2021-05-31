"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("regenerator-runtime/runtime.js");

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schemas = _interopRequireDefault(require("./schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var Config = _interopRequireWildcard(require("./configs"));

var _cors = _interopRequireDefault(require("cors"));

var _Auth = _interopRequireDefault(require("./middleware/Auth"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var sgMail = require('@sendgrid/mail');

var startServer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var app, stripe, server;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            app = (0, _express["default"])();
            stripe = require("stripe")("sk_test_51IdKa0EWLULmTbAKV5JLEAXK4XalxwTWVRVYc9nl2bUEeHLnvZ8IFXnuxUdNjtVT0nktMU79VVeuDsSHE58KO5nF00Bjcw0zFE");
            app.use(_express["default"]["static"]("."));
            app.use(_express["default"].json());
            app.use((0, _cors["default"])());
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: _schemas["default"],
              resolvers: _resolvers["default"],
              context: function context(_ref2) {
                var req = _ref2.req,
                    res = _ref2.res,
                    next = _ref2.next;
                return {
                  req: req,
                  res: res,
                  next: next
                };
              }
            });
            app.use(_Auth["default"]);
            server.applyMiddleware({
              app: app
            });
            app.get("/", /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        res.send("API WORKING");

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x, _x2) {
                return _ref3.apply(this, arguments);
              };
            }());
            app.post("/create-payment-intent", /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
                var _req$body, Price, receipt_email, paymentIntent, msg;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _req$body = req.body, Price = _req$body.Price, receipt_email = _req$body.receipt_email; // Create a PaymentIntent with the order amount and currency

                        _context2.next = 3;
                        return stripe.paymentIntents.create({
                          amount: Math.round(Price * 100),
                          currency: "usd"
                        });

                      case 3:
                        paymentIntent = _context2.sent;
                        console.log(receipt_email);
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        msg = {
                          to: receipt_email,
                          // Change to your recipient
                          from: "regis.grumberg@gmail.com",
                          // Change to your verified sender
                          subject: 'Achat Fullstack gql',
                          text: "Achat fait sur une app de test au prix de ".concat(Price, "\u20AC"),
                          html: "<strong>Achat fait sur une app de test au prix de ".concat(Price, "\u20AC</strong>")
                        };
                        sgMail.send(msg).then(function () {
                          console.log('Email sent');
                        })["catch"](function (error) {
                          console.error(error);
                        });
                        res.send({
                          clientSecret: paymentIntent.client_secret
                        });

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3, _x4) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context3.next = 12;
            return _mongoose["default"].connect(Config.db.url, {
              useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true,
              useFindAndModify: true
            }).then(function () {
              console.log("Successfully connect to database");
            })["catch"](function (err) {
              console.log('couldn"t not connect to database', err);
              process.exit(-1);
            });

          case 12:
            app.listen({
              port: process.env.PORT
            }, function (e) {
              return console.log("\uD83D\uDE80 GraphQl ready at http://localhost:".concat(process.env.PORT).concat(server.graphqlPath));
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer(); // require('dotenv').config()
// const app = require("./services/server.service");
// const mongoService = require("./services/mongoose.service");
// mongoService.dbConnect();
// app.start();
//# sourceMappingURL=server.js.map