const {gql} = require('apollo-server-express');

module.exports = gql`
  type Product {
    id: ID!
    Title: String
    Price: Float!
    Url:String
    Description: String
  }
  extend type Query {
    products: [Product]
    product(id: ID!): Product
    productsFilter(value:String!): [Product]
    productsByArray(array:[ID]):[Product]
  }
  extend type Mutation {
    createProduct(Title: String, Price: Float,Url:String, Description: String): Product,
    updateProduct(id:ID!,Title: String, Price: Float, Description: String,Url:String): Product,
    deleteProduct(id:ID!): Product
  }
`;
