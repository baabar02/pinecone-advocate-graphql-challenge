import { addTodo, deleteTodo, sayHello, updateTodo } from "@/graphql/resolvers/mutations/say-hello";
import { TodoModel } from "@/graphql/schemas";
import { connectMongoose } from "@/mongoose/mongoose-connection";

jest.mock('@/mongoose/mongoose-connection', () => {
  console.log('Mocking mongoose-connection');
  return { connectMongoose: jest.fn().mockResolvedValue(true) };
});

jest.mock("mongoose", () => {
  const mModel = function (data:any) {
    return {
      ...data,
    save: jest.fn().mockResolvedValue({
  id: "1",
  title: data.title,
  description: data.description,
  completed: false
})
    };
  };
  mModel.findOneAndDelete = jest.fn().mockResolvedValue(true);
  mModel.findOneAndUpdate = jest.fn().mockResolvedValue({
    id: "1",
    title: "updated todo",
    description: "mock description",

    
    completed: true
  });
  mModel.find = jest.fn().mockResolvedValue([]);

  return {
    model: jest.fn(() => mModel),
    models: {},
    Schema: jest.fn(),
    connect: jest.fn(),
  };
});


describe("addTodo", () => {
it("Should add a new todo", async () => {
  const result = await addTodo({}, { title: "test todo", description: "test description" });
  expect(result).toBeDefined();
  expect(result.title).toBe("test todo");
  expect(result.description).toBe("test description");
  expect(result.completed).toBe(false);
},10000);

  it("Should delete a todo", async () => {
    const todo = await addTodo({}, { title: "delete me", description: "delete description" });
    const deleted = await deleteTodo({}, { id: todo.id });
    expect(deleted).toBe(true);
  });

it('Should update a todo', async () => {
  const todo = await addTodo({}, { title: 'update me', description: 'update description' });
  expect(todo.id).toBeDefined();
  const updated = await updateTodo({}, { id: todo.id, completed: true });
  expect(updated.completed).toBe(true);
});
});

describe("sayHello Mutation", () => {
  it("Should call say hello mutation with name input", () => {
    const result = sayHello({}, { name: "baabar" });
    expect(result).toEqual({ name: "baabar" });
  });
});