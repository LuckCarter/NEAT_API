import { gql } from "apollo-server-express";

export default gql`
  type Categorie {
    id: ID
    Title: String
    Products: [Product]
  }
  union Filterd = Categorie | Product
  type Data {
    values: Filterd
}
  extend type Query {
    categories: [Categorie]
    categorie(Title: String): Categorie
    categoriesProductFilter(value: String, id: ID!): Categorie
  }
  extend type Mutation {
    createCategorie(Title: String, Products: [ID]): Categorie
    updateCategorie(id: ID!, Title: String, Products: [ID]): Categorie
    deleteCategorie(id: ID!): Categorie
  }
`;
