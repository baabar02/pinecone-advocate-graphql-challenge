import { TodoModel } from "@/graphql/schemas";
import { connectMongoose } from "@/mongoose/mongoose-connection";
import { nanoid } from "nanoid";


const Todo = [{
  id: "1",
  title: "Sample Todo",
  completed: false,
}];

export const addTodo = async (_: unknown, args: { id: string; title:string }) => {
  await connectMongoose
const newTodo = new TodoModel({...args, id: nanoid(),completed: false});
Todo.push(newTodo);

await newTodo.save();
  return  newTodo
};

export const updateTodo = (_: unknown, args: { id: string; title?: string; completed?: boolean }) => {
  const todoIndex = Todo.findIndex(todo => todo.id === args.id);
  if (todoIndex === -1) {
    throw new Error("Todo not found");
  }
  const updatedTodo = { ...Todo[todoIndex], ...args };
  Todo[todoIndex] = updatedTodo;
  return updatedTodo;
}

export const deleteTodo = (_: unknown, args: { id: string }) => {
  const todoIndex = Todo.findIndex(todo => todo.id === args.id);
  Todo.splice(todoIndex, 1);
  return true;
};
//