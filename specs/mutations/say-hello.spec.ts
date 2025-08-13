import { addTodo, deleteTodo, sayHello, updateTodo } from "@/graphql/resolvers/mutations/say-hello";
import { TodoModel } from "@/graphql/schemas";

// describe("Hello Mutation", () => {
//   it("Should call say hello mutation with name input", () => {
//     expect(sayHello({}, { name: "baabar" })).toBeDefined();
//   });
// });

// describe("Todo mutations", () => {

// it("Should add a new todo", async () => {
//   const result = await new TodoModel({}, {title:"test todo"});
//   expect(result).toBeDefined();
//   expect(result.title).toBe("test todo");
//   expect(result.completed).toBe(false);

// });

// it("should delete a todo", async () =>{
//   const todo = await new TodoModel({}, {title:"delete me"});
//   const deleted = await deleteTodo({},{id:todo.id})
//   expect(deleted).toBe(true)
// })

// it("should update a todo", async () =>{
//   const todo = await new TodoModel({},{title:"update me"});
//   const updated = await updateTodo({}, {id:todo.id, completed:true});
//   expect(updated.completed).toBe(true)
// })
// });



describe("sayHello Mutation", () => {
  it("Should call say hello mutation with name input", () => {
    const result = sayHello({}, { name: "baabar" });
    expect(result).toEqual({ name: "baabar" });
  });
});

describe("Todo Mutations", () => {
  it("Should add a new todo", async () => {
    const result = await addTodo({}, { title: "test todo" });
    expect(result).toBeDefined();
    expect(result.title).toBe("test todo");
    expect(result.completed).toBe(false);
  }, 10000);

  it("Should delete a todo", async () => {
    const todo = await addTodo({}, { title: "delete me" });
    const deleted = await deleteTodo({}, { id: todo.id });
    expect(deleted).toBe(true);
  });

  it("Should update a todo", async () => {
    const todo = await addTodo({}, { title: "update me" });
    const updated = await updateTodo({}, { id: todo.id, completed: true });
    expect(updated.completed).toBe(true);
  });
});
