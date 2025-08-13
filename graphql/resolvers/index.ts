import { addTodo, deleteTodo, updateTodo } from "./mutations/say-hello";
import { getTodo } from "./queries/hello-query";

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
