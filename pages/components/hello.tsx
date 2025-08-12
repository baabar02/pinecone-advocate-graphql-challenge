'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

export const Hello = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  // const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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


  useEffect(() => {
    const addTodo = async () => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              createTodo(title: "Learn GraphQL") {
                id
                title
                completed
              }
            }
          `,
        }),
      });

      const result = await response.json();
      console.log("Created todo:", result.data.createTodo);

      setTodos(prev => [...prev, result.data.createTodo]);
    };

    addTodo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1>GraphQL To-Do</h1>

      {todos.map((todo) => (
        <div key={todo.id} style={{ margin: "10px 0" }}>
          <h3>{todo.title}</h3>
          <p>{todo.completed ? ' Completed' : ' Not Completed'}</p>
        </div>
      ))}

      <Button>
        Add To-Do
      </Button>
      <Input onChange={(e)=>(e.target.value)}
      placeholder='insert todo'></Input>
    </div>
  );
};
