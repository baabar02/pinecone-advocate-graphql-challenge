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
