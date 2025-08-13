import { TodoModel } from "@/graphql/schemas";
import { connectMongoose } from "@/mongoose/mongoose-connection";
import { nanoid } from "nanoid";
import { todo } from "node:test";
import { title } from "process";



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



export const deleteTodo = async (_: unknown, args: { id: string }) => {
  await connectMongoose();

  const deleted = await TodoModel.findOneAndDelete({ id: args.id });

  return !!deleted;
};


export const updateTodo = async (
  _: unknown,
  args: { id: string; title?: string; completed?: boolean }
) => {
  await connectMongoose();

  if (args.title === undefined && args.completed === undefined) {
    throw new Error("No fields to update");
  }


  const updatedTodo = await TodoModel.findOneAndUpdate(
    { id: args.id },
  
    {
      ...(args.title !== undefined && { title: args.title }),
      ...(args.completed !== undefined && { completed: args.completed }),
 
    },
    { new: true } 
  );
  console.log(updatedTodo, "Update result");
  

  if (!updatedTodo) {
    throw new Error("Todo not found");
  }
  console.log(updatedTodo)

  return updatedTodo;
};

export const sayHello = (_parent: any, args: { name: string }) => {
  return { name:  args.name };
};