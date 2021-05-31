import { gql } from "apollo-server-express";

module.exports = gql`
    type Order {
        id: ID,
        AmountTotal:Float,
        Products: [Product]
        User: User,
        Statut: String
    }
    input OrderInput {
        AmountTotal:Float, 
        Products:[ID],
        User:ID
    }
    extend type Query {
        orders:[Order]
        order(id:ID): Order
        orderUser(id:ID):[Order]
    }
    extend type Mutation {
        createOrder(AmountTotal:Float, Products:[ID],User:ID,Statut: String): Order
        updateOrder(id:ID!,Statut:String): Order,
        deleteOrder(id:ID!): Order
    }
`