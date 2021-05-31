"use strict";

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server-express'),
    gql = _require.gql;

module.exports = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Product {\n    id: ID!\n    Title: String\n    Price: Float!\n    Url:String\n    Description: String\n  }\n  extend type Query {\n    products: [Product]\n    product(id: ID!): Product\n    productsFilter(value:String!): [Product]\n    productsByArray(array:[ID]):[Product]\n  }\n  extend type Mutation {\n    createProduct(Title: String, Price: Float,Url:String, Description: String): Product,\n    updateProduct(id:ID!,Title: String, Price: Float, Description: String,Url:String): Product,\n    deleteProduct(id:ID!): Product\n  }\n"])));
//# sourceMappingURL=product.schema.js.map