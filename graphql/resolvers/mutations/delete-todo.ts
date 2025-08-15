import { TodoModel } from "@/graphql/schemas/model";
import { connectMongoose } from "@/mongoose/mongoose-connection";




export const deleteTodo = async (_: unknown, args: { id: string }) => {
  await connectMongoose();

  const deleted = await TodoModel.findOneAndDelete({ id: args.id });

  return !!deleted;
};

