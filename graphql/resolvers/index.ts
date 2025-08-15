import { addTodo } from "./mutations/add-todo";
import {  deleteTodo } from "./mutations/delete-todo";
import { updateTodo } from "./mutations/update-todo";
import { getTodo } from "./queries/get-todo";

export const resolvers = {
  Query: {
    getTodo,
  },
  Mutation: {
    addTodo,
    updateTodo,
    deleteTodo
  },
};
