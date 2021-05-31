"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type Order {\n        id: ID,\n        AmountTotal:Float,\n        Products: [Product]\n        User: User,\n        Statut: String\n    }\n    input OrderInput {\n        AmountTotal:Float, \n        Products:[ID],\n        User:ID\n    }\n    extend type Query {\n        orders:[Order]\n        order(id:ID): Order\n        orderUser(id:ID):[Order]\n    }\n    extend type Mutation {\n        createOrder(AmountTotal:Float, Products:[ID],User:ID,Statut: String): Order\n        updateOrder(id:ID!,Statut:String): Order,\n        deleteOrder(id:ID!): Order\n    }\n"])));
//# sourceMappingURL=order.schema.js.map