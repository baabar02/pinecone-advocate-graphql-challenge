// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { gql, useQuery } from '@apollo/client';
// import { useEffect, useState } from 'react';

// export type TodoType = {
//   id: string;
//   title: string;
//   completed: boolean;
//   _id: string
// };

// export const Hello = () => {
//   const [todos, setTodos] = useState<TodoType[]>([]);
//   const [newTodo, setNewTodo] = useState<string>("");


//   useEffect(() => {
//     const getTodos = async () => {

//       const response = await fetch("/api/graphql", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: `
//             query {
//               getTodo {
//                 id
//                 title
//                 completed
//               }
//             }
//           `,
//         }),
//       });
//       // console.log(response, "response");
      
//       const result = await response.json();
//       // console.log(result, "result");
//       setTodos(result.data.getTodo);
//     };

//     getTodos();
//     console.log("Todos fetched:", todos);
    
//   }, []);


//   const handleAdd = async () => {
//     if (!newTodo.trim()) return;

//     const response = await fetch("/api/graphql", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: `
//           mutation {
//             addTodo(title: "${newTodo}") {
//               id
//               title
//               completed
//             }
//           }
//         `,
//       }),
//     });

//     const result = await response.json();
//     setTodos(prev => [...prev, result.data.addTodo]);
//     setNewTodo(""); 
//   };


//   const handleDelete = async (id: string, title: string) => {
//     await fetch("/api/graphql", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: `
//           mutation {
//             deleteTodo(id: "${id}")
//           }
//         `,
//       }),
//     });

//     setTodos(prev => prev.filter(todo => todo.id !== id));
//   };

 
// const handleUpdate = async (id: string, title?: string, completed?: boolean) => {
//   if (title === undefined && completed === undefined) return;

//   const query = `
//     mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
//       updateTodo(id: $id, title: $title, completed: $completed) {
//         id
//         title
//         completed
//       }
//     }
//   `;

//   const variables = {
//     id,
//     ...(title !== undefined && { title }),
//     ...(completed !== undefined && { completed }),
//   };

//   const response = await fetch("/api/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, variables }),
//   });

//   const result = await response.json();
//   console.log("Update result:", result);
 
//   if (result.errors) {
//     console.error("GraphQL errors:", result.errors);
//     return;
//   }

//   const updatedTodo = result.data.updateTodo;
//   setTodos((prev) =>
//     prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
//   );
// };


// const GET_TODOS = gql`
//   query GetTod {
//     getTodo {
//       id
//       title
//       completed
//     }
//   }`

// const {loading, error, data} = useQuery(GET_TODOS);

// console.log(data, "Query da");

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: 'column',
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         padding: "2rem",
//       }}
//     >
//       <h1>GraphQL To-Do</h1>

//       <div style={{ marginBottom: "1rem" }}>
//         <Input
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder='Insert a new todo'
//         />
//         <Button onClick={handleAdd} style={{ marginTop: "0.5rem" }}>
//           Add To-Do
//         </Button>
//       </div>

//       {todos.map((todo) => (
//         <div key={todo.id} style={{ margin: "10px 0", border: "1px solid gray", padding: "10px", width: "300px" }}>
//           <h3>{todo.title}</h3>
//           <p>{todo.completed ? ' Completed' : ' Not Completed'}</p>
//           <Button onClick={() => handleUpdate(todo.id, todo.title, todo.completed)} style={{ marginRight: "0.5rem" }}>
//             Update
//           </Button>
//           <Button variant="destructive" onClick={() => handleDelete(todo.id, todo.title)}>
//             Delete
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  _id: string;
};

export const Hello = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');


  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              getTodo {
                id
                title
                completed
              }
            }
          `,
        }),
      });
      const result = await response.json();
      setTodos(result.data.getTodo);
    };
    getTodos();
  }, []);


  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            addTodo(title: "${newTodo}") {
              id
              title
              completed
            }
          }
        `,
      }),
    });
    const result = await response.json();
    setTodos((prev) => [...prev, result.data.addTodo]);
    setNewTodo('');
  };


  const handleDelete = async (id: string) => {
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            deleteTodo(id: "${id}")
          }
        `,
      }),
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };


  const handleUpdate = async (id: string, title: string, completed: boolean) => {
    const query = `
      mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
        updateTodo(id: $id, title: $title, completed: $completed) {
          id
          title
          completed
        }
      }
    `;
    const variables = { id, title, completed };
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    if (result.errors) return;
    const updatedTodo = result.data.updateTodo;
    setTodos((prev) => prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  return (
    <div className="flex flex-col items-center bg-green-200 justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">GraphQL To-Do</h1>

      <div className="mb-4 w-full max-w-md flex flex-col gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Insert a new todo"
        />
        <Button onClick={handleAdd} className="mt-2 w-full bg-red-400">
          Add To-Do
        </Button>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="border border-gray-300 rounded p-4 bg-white shadow flex flex-col gap-2">
            <Input
              value={todo.title}
              onChange={(e) =>
                setTodos((prev) =>
                  prev.map((t) => (t.id === todo.id ? { ...t, title: e.target.value } : t))
                )
              }
              className="mb-2"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  setTodos((prev) =>
                    prev.map((t) => (t.id === todo.id ? { ...t, completed: e.target.checked } : t))
                  )
                }
                className="w-4 h-4"
              />
              Completed
            </label>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleUpdate(todo.id, todo.title, todo.completed)} className="flex-1">
                Update
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(todo.id)} className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

