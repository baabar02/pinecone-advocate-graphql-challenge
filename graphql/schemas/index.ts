import { gql } from "graphql-tag";




export const typeDefs = gql`

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    _id: String
     description: String

    }
   

  type Query {
    getTodo: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, description:String): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean, description: String): Todo!
    deleteTodo(id: ID!): Boolean!
   
  }
`;
