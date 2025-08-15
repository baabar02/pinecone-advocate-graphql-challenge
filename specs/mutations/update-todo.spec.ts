import { updateTodo } from "@/graphql/resolvers/mutations/update-todo";
import { TodoModel } from "@/graphql/schemas/model";

jest.mock('@/mongoose/mongoose-connection', () => ({
  connectMongoose: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/graphql/schemas/model", () => ({
  
    TodoModel: {
      findOneAndUpdate: jest.fn().mockResolvedValue({
        id: "2",
        title: "Updated title",
        description: "Updated description",
        completed: true
      })
    }
}));

describe("updateTodo", ()=>{
  it("Ene yr n update hiigeed ur dun butsaah ystoi mangaraa", async ()=>{
    const updatedData = await updateTodo({}, {
       id: "2",
        title: "Updated title",
        description: "Updated description",
        completed: true
    })
    expect(updatedData).toBeDefined();
    expect(updatedData.title).toBe("Updated title")
    expect(updatedData.completed).toBe(true)
    expect(updatedData.id).toBe("2")
  })

  it("should throw error if no fields to update", async () => {
  await expect(
    updateTodo({}, { id: "1" }) // no title or completed provided
  ).rejects.toThrow("No fields to update");
});
// it("should throw error if todo not found", async () => {
//   const { TodoModel } = require("../../graphql/schemas/model");
//   TodoModel.findOneAndUpdate.mockResolvedValueOnce(null);

//   await expect(
//     updateTodo({}, { id: "999", completed: true })
//   ).rejects.toThrow("Todo not found");
// });
})