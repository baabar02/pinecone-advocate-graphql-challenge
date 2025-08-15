
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { TodoUpdate } from './todo-update';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  _id: string;
  description: string;
};

export const Hello = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');


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
                description
              }
            }
          `,
        }),
      });
      const result = await response.json();
console.log(result, "Result from getTodo query" );

if (result.errors) {
  console.error("GraphQL Error:", result.errors);
  return;
}

if (!result.data || !result.data.getTodo) {
  console.warn("No data received from getTodo query");
  return;
}
      setTodos(result.data.getTodo);
      console.log(result.data.getTodo, "Todos fetched");
      
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
            addTodo(title: "${newTodo}", description: "${newDescription}") {
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
      setNewDescription('');
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

  const GET_TODOS = gql`
  query GetTod {
    getTodo {
      id
      title
      completed
      description
    }
  }`

const {loading, error, data} = useQuery(GET_TODOS);

console.log(data, "Query da");

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">GraphQL To-Do</h1>

      <div className="mb-4 w-full max-w-md flex flex-col gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Insert a new todo"
        />
        <Input value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder='Insert description'/>
        <Button onClick={handleAdd} className="mt-2 w-full bg-red-400">
          Add To-Do
        </Button>
      </div>
    {/* <TodoUpdate/> */}
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
