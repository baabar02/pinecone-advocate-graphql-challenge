
import { addTodo, deleteTodo, sayHello, updateTodo } from "@/graphql/resolvers/mutations/say-hello";
import { TodoModel } from "@/graphql/schemas";


jest.mock("../../graphql/schemas");{
  TodoModel.create = jest.fn();
}



describe("sayHello Mutation", () => {
  it("Should call say hello mutation with name input", () => {
    const result = sayHello({}, { name: "baabar" });
    expect(result).toEqual({ name: "baabar" });
  });
});

describe("Todo Mutations", () => {
  it("Should add a new todo", async () => {
    const result = await addTodo({}, { title: "test todo", description: "test description" });
    expect(result).toBeDefined();
    expect(result.title).toBe("test todo");
    expect(result.completed).toBe(false);
  }, 10000);

  it("Should delete a todo", async () => {
    const todo = await addTodo({}, { title: "delete me", description: "delete description" });
    const deleted = await deleteTodo({}, { id: todo.id });
    expect(deleted).toBe(true);
  });

  it("Should update a todo", async () => {
    const todo = await addTodo({}, { title: "update me",description: "update description" });
    const updated = await updateTodo({}, { id: todo.id, completed: true });
    expect(updated.completed).toBe(true);
  });
});
