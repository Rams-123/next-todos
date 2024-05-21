"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navbar from "@/components/Navbar";

const API_BASE_URL = "https://dummyjson.com/todos";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setTodos(data.todos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: newTitle,
          description: newDescription,
          completed: false,
          userId: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setNewTitle("");
      setNewDescription("");
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error adding todo:", error);
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
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
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

      setTodos(todos.filter((todo) => todo.id !== id));
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
    <section className="flex flex-col h-screen w-full max-w-md mx-auto p-4">
      <div className="flex flex-col w-full border border-slate-500 p-5 rounded-2xl gap-4 flex-grow">
        <div className="flex flex-col w-full gap-4 flex-grow">
          <Navbar className="fixed" />

          <div className="flex flex-col flex-grow gap-4">
            {todos.map((todo, index) => (
              <div key={index} className="flex flex-col border shadow-lg border-slate-500 px-5 py-3 rounded-md">
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="px-5 w-full flex flex-1">{todo.todo}</p>
                  <button
                    className="hover:text-blue-500 rounded-md"
                    aria-label="Edit Task"
                    onClick={() => openEditDrawer(todo)}
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
          <div className="">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} className="max-w-md">
              <DrawerTrigger asChild>
                <Button className="w-full bg-blue-600">Add Todo</Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-md mx-auto flex gap-4">
                <DrawerHeader className="grid w-full gap-4">
                  <h2>{isEditing ? "Edit Todo" : "Add Todo"}</h2>
                  <DrawerTitle>
                    <Input
                      placeholder="Add Todo title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </DrawerTitle>
                  <DrawerDescription>
                    <Input
                      placeholder="Add description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className={"grid w-full grid-cols-2 gap-4"}>
                  <Button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
                    {isEditing ? "Update Todo" : "Submit"}
                  </Button>
                  <DrawerClose>
                    <Button className="w-full" variant="outline" onClick={closeDrawer}>
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </section>
  );
}
