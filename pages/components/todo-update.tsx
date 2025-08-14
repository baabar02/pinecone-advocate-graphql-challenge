import { Input } from "@/components/ui/input";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const TodoUpdate = () => {

    const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean, $description: String) {
        updateTodo(id: $id, title: $title, completed: $completed, description: $description) {
            id
            title
            completed
            description
        }
    }
  `;

  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    try {
      await updateTodo({
        variables: { title, completed, description },
      });
      alert("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo.");
    }
  };

  return (
    <div>
      <h2>Update Todo</h2>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <label>Completed</label>
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Todo</button>
    </div>
  );
}


// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import { gql, useMutation } from '@apollo/client';

// const UPDATE_TODO_MUTATION = gql`
//   mutation UpdateTodo(
//     $id: ID!
//     $title: String
//     $completed: Boolean
//     $description: String
//   ) {
//     updateTodo(id: $id, title: $title, completed: $completed, description: $description) {
//       id
//       title
//       completed
//       description
//     }
//   }
// `;

// type TodoUpdateProps = {
//   refetchTodos: () => void;
// };

// export const TodoUpdate = ({ refetchTodos }: TodoUpdateProps) => {
//   const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);

//   const [id, setId] = useState('');
//   const [title, setTitle] = useState('');
//   const [completed, setCompleted] = useState(false);
//   const [description, setDescription] = useState('');

//   const handleUpdate = async () => {
//     if (!id.trim()) {
//       alert('Please enter Todo ID');
//       return;
//     }

//     try {
//       await updateTodo({
//         variables: { id, title, completed, description },
//       });
//       alert('Todo updated successfully!');
//       setId('');
//       setTitle('');
//       setCompleted(false);
//       setDescription('');
//       refetchTodos();
//     } catch (error) {
//       console.error('Error updating todo:', error);
//       alert('Failed to update todo.');
//     }
//   };

//   return (
//     <div className="mt-8 p-4 border rounded max-w-md w-full bg-white shadow">
//       <h2 className="text-xl font-bold mb-4">Update Todo</h2>
//       <Input
//         type="text"
//         placeholder="Todo ID"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//         className="mb-2"
//       />
//       <Input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="mb-2"
//       />
//       <label className="flex items-center gap-2 mb-2">
//         <input
//           type="checkbox"
//           checked={completed}
//           onChange={(e) => setCompleted(e.target.checked)}
//           className="w-4 h-4"
//         />
//         Completed
//       </label>
//       <Input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="mb-4"
//       />
//       <button
//         onClick={handleUpdate}
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//       >
//         Update Todo
//       </button>
//     </div>
//   );
// };
