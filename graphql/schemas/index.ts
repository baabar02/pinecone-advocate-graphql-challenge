import { gql } from "graphql-tag";
import mongoose, { model } from "mongoose";



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

const TodoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  description: { type: String, default: "" }
}, 

{timestamps: true });

export const TodoModel = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);