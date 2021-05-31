"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server-express"),
    gql = _require.gql;

var _default = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type User {\n    id: ID!\n    Firstname: String\n    Lastname: String\n    Phone: String\n    Adress: String\n    Email: String\n    Password: String\n    IsAdmin: Boolean\n  }\n  type AuthData {\n    userId: String\n    token: String\n  }\n  type Query {\n    users: [User]\n    user(id: ID): User\n    login(Email: String!, Password: String!): String\n  }\n  type Mutation {\n    deleteUser(id:ID!): User\n    signup(\n      Firstname: String!\n      Lastname: String!\n      Phone: String!\n      Adress: String!\n      Email: String!\n      Password: String!\n      IsAdmin: Boolean!\n    ): String\n\n    userUpdate(\n      id: ID!\n      Firstname: String\n      Lastname: String\n      Phone: String\n      Adress: String\n      Email: String\n      Password: String\n      IsAdmin: Boolean\n    ): User\n  }\n"])));

exports["default"] = _default;
//# sourceMappingURL=user.schema.js.map