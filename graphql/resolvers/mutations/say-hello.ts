import { TodoModel } from "@/graphql/schemas";
import { connectMongoose } from "@/mongoose/mongoose-connection";
import { nanoid } from "nanoid";
import { todo } from "node:test";



export const addTodo = async (_: unknown, args: { title: string }) => {
  await connectMongoose();
  const newTodo = new TodoModel({
    id: nanoid(),
    title: args.title,
    completed: false
  });
  await newTodo.save();
  return newTodo;
};

// export const updateTodo = async (_: unknown, args: { id: string; title?: string; completed?: boolean }) => {
//   await connectMongoose();

//   const todoIndex = Todo.findIndex(todo => todo.id === args.id);
//   if (todoIndex === -1) {
//     throw new Error("Todo not found");
//   }
//   const updatedTodo = { ...Todo[todoIndex], ...args };
//   Todo[todoIndex] = updatedTodo;
//   return updatedTodo;
// }

// export const deleteTodo = (_: unknown, args: { id: string }) => {
//   const todoIndex = Todo.findIndex(todo => todo.id === args.id);
//   Todo.splice(todoIndex, 1);
//   return true;
// };
//