"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit } from "lucide-react";



import { ScrollArea } from "@/components/ui/scroll-area";
import { addTodo, getTodos, updateTodo } from "@/actions/page";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import TodoForm from "@/components/TodoForm";

const API_BASE_URL = "https://dummyjson.com/todos";

export default function Home({ todo, userId }) {
  const [todos, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      // const res = await fetch(API_BASE_URL);
      const data = await getTodos();
      setTodo(data.todos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault()
    try {
      await addTodo(title)
      setIsDrawerOpen(false);
      // addTodo({ title: newTitle, description: newDescription });

      // const res = await fetch(`${API_BASE_URL}/add`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     title,
      //     // description,
      //     completed: false,
      //     userId,
      //   }),
      // });

      // if (!res.ok) {
      //   const errorText = await res.text();
      //   throw new Error(`Failed to add todo: ${errorText}`);
      // }

      // return await res.json();
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/${selectedTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: newTitle,
          description: newDescription,
          completed: selectedTodo.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await res.json();
      setTodo(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      setNewTitle("");
      setNewDescription("");
      setSelectedTodo(null);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodo(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const openEditDrawer = (todo) => {
    setSelectedTodo(todo);
    setNewTitle(todo.todo);
    setNewDescription(todo.description);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTodo(null);
    setNewTitle("");
    setNewDescription("");
    setIsEditing(false);
  };

  return (

    <>
      <div className="w-full flex flex-col overflow-hidden h-navScreen">
        <ScrollArea className="w-full flex h-full border-none focus:border-none outline-none">
          <div className="flex h-fit justify-start flex-col w-full gap-4 p-4">
            {todos.map((todo, index) => (
              <div key={index} className="flex flex-col border shadow-lg border-slate-500 px-5 py-3 rounded-md">
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="px-5 w-full flex flex-1">{todo.todo}</p>
                  <button
                    className="hover:text-blue-500 rounded-md"
                    aria-label="Edit Task"
                    onClick={() => updateTodo(todo.id)}
                  // onClick={(() => handleAddTodo(setTodo))}
                  >
                    <Edit className="hover:text-blue-600" size={13} />
                  </button>
                  <button
                    className="hover:text-red-500 rounded-md"
                    aria-label="Delete Task"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <Trash2 className="hover:text-red-600" size={13} />
                  </button>

                </div>
                <h2>{todo.title}</h2>
                <p className="px-5 w-full text-gray-600">{todo.description}</p>
              </div>
            ))}
          </div>
          <Scrollbar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="w-full flex px-4">
        <TodoForm />
      </div>
    </>
  );
}
