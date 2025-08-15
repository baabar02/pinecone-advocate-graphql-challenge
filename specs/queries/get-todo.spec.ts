import { getTodo } from "@/graphql/resolvers/queries/get-todo";

jest.mock('../../mongoose/mongoose-connection', () => ({
  connectMongoose: jest.fn().mockResolvedValue(true),
}));

jest.mock("../../graphql/schemas/model", () => ({
  TodoModel: {
    find: jest.fn().mockResolvedValue([
      { id: "1", title: "Todo 1", description: "desc", completed: false },
    ]),
  },
}));

describe("getTodo", () => {
  it("should return an array of todos", async () => {
    const result = await getTodo();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].title).toBe("Todo 1");
  });
});