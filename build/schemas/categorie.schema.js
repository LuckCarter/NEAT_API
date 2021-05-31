"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Categorie {\n    id: ID\n    Title: String\n    Products: [Product]\n  }\n  union Filterd = Categorie | Product\n  type Data {\n    values: Filterd\n}\n  extend type Query {\n    categories: [Categorie]\n    categorie(Title: String): Categorie\n    categoriesProductFilter(value: String, id: ID!): Categorie\n  }\n  extend type Mutation {\n    createCategorie(Title: String, Products: [ID]): Categorie\n    updateCategorie(id: ID!, Title: String, Products: [ID]): Categorie\n    deleteCategorie(id: ID!): Categorie\n  }\n"])));

exports["default"] = _default;
//# sourceMappingURL=categorie.schema.js.map