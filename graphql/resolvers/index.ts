import { addTodo, deleteTodo, updateTodo } from "./mutations/delete-todo";
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
