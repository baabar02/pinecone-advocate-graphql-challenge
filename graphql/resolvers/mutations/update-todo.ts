import { TodoModel } from "@/graphql/schemas/model";
import { connectMongoose } from "@/mongoose/mongoose-connection";

export const updateTodo = async (
  _: unknown,
  args: { id: string; title?: string; completed?: boolean, description?: string }
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
      ...(args.description !== undefined && { description: args.description })
 
    },
    { new: true } 
  )
  

  return updatedTodo;
};