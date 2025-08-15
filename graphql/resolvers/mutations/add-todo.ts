import { TodoModel } from "@/graphql/schemas/model";
import { connectMongoose } from "@/mongoose/mongoose-connection";


export const addTodo = async (_: unknown, args: { id:string, title: string, description:string }) => {
//   await connectMongoose();
  const newTodo = new TodoModel({
    id: args.id,
    title: args.title,
    completed: false,
    description: args.description
  });
  await newTodo.save();
  return newTodo;
};
