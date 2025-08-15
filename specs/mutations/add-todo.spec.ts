import { addTodo } from "@/graphql/resolvers/mutations/add-todo";

jest.mock('../../mongoose/mongoose-connection', () => ({
  connectMongoose: jest.fn().mockResolvedValue(true),
}));

jest.mock("../../graphql/schemas/model", () => {
  return {
    TodoModel: jest.fn().mockImplementation(function (this: any, todoData: {id: string, title: string, description: string}) {
      this.id = todoData.id;
      this.title = todoData.title;
      this.description = todoData.description;
      this.completed = false;

      this.save = jest.fn().mockResolvedValue(this);
    }),
  };
});

describe("addTodo", () => {
  it("Should add a new todo and return it", async () => {
    const todoData = {
      id: "1",
      title: "test todo",
      description: "test description"
    };
    const result = await addTodo({}, todoData);

    expect(result).toBeDefined();
    expect(result.id).toBe("1");
    expect(result.title).toBe("test todo");
    expect(result.description).toBe("test description");
    expect(result.completed).toBe(false);
  });
});
