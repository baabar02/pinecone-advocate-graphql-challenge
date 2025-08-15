import { deleteTodo } from "@/graphql/resolvers/mutations/delete-todo";

jest.mock('../../mongoose/mongoose-connection', () => ({
  connectMongoose: jest.fn().mockResolvedValue(true),
}));


jest.mock("../../graphql/schemas/model", () => ({
  TodoModel: {
    findOneAndDelete: jest.fn().mockResolvedValue({ id: "1" }),
  },
}));


describe("deleteTodo", () => {
  it("should delete a todo and return true", async () => {
    const result = await deleteTodo({}, { id: "1" });

    expect(result).toBe(true);
  });

  it("should return false if no todo was deleted", async () => {
    const { TodoModel } = require("../../graphql/schemas/model");
    TodoModel.findOneAndDelete.mockResolvedValueOnce(null);

    const result = await deleteTodo({}, { id: "nonexistent" });

    expect(result).toBe(false);
  });
});