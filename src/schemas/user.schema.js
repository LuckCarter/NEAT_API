const { gql } = require("apollo-server-express");

export default gql`
  type User {
    id: ID!
    Firstname: String
    Lastname: String
    Phone: String
    Adress: String
    Email: String
    Password: String
    IsAdmin: Boolean
  }
  type AuthData {
    userId: String
    token: String
  }
  type Query {
    users: [User]
    user(id: ID): User
    login(Email: String!, Password: String!): String
  }
  type Mutation {
    deleteUser(id:ID!): User
    signup(
      Firstname: String!
      Lastname: String!
      Phone: String!
      Adress: String!
      Email: String!
      Password: String!
      IsAdmin: Boolean!
    ): String

    userUpdate(
      id: ID!
      Firstname: String
      Lastname: String
      Phone: String
      Adress: String
      Email: String
      Password: String
      IsAdmin: Boolean
    ): User
  }
`;
