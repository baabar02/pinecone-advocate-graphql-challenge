
import { TodoModel } from "@/graphql/schemas/model";
import { connectMongoose } from "@/mongoose/mongoose-connection";




export const getTodo = async () => {
  
await connectMongoose();
const todos = await TodoModel.find();
 return todos;
};
