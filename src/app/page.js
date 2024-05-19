"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { title: newTitle, description: newDescription };
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      const newTodo = { title: newTitle, description: newDescription };
      setTodos([...todos, newTodo]);
    }
    setNewTitle("");
    setNewDescription("");
    setIsDrawerOpen(false);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index) => {
    setNewTitle(todos[index].title);
    setNewDescription(todos[index].description);
    setIsEditing(true);
    setEditingIndex(index);
    setIsDrawerOpen(true);
  };

  return (
    <section className="flex flex-col h-screen w-full max-w-md mx-auto p-4 overflow-hidden">
      <div className="flex flex-col w-full border border-slate-500 p-5 rounded-2xl gap-4 flex-grow">
        <div className="flex flex-col w-full gap-4 flex-grow">
          <div>
            <h1 className="text-lg font-bold">Today Todos</h1>
          </div>
          <div className="flex flex-col flex-grow gap-4 overflow-auto">
            {todos.map((todo, index) => (
              <div key={index} className="flex flex-col border shadow-lg border-slate-500 px-5 py-3 rounded-md">
                <div className="flex w-full items-center justify-between">
                  <input
                    type="checkbox"
                    className="items-center"
                    onClick={() => handleEditTodo(index)}
                  />
                  <p className="px-5 w-full flex flex-1">{todo.title}</p>
                  <button
                    className="hover:text-red-500 rounded-md"
                    aria-label="Delete Task"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <Trash2 className='hover:text-red-600' size={13} />
                  </button>
                </div>
                <p className="px-5 w-full text-gray-600">{todo.description}</p>
              </div>
            ))}
          </div>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} className="max-w-md">
            <DrawerTrigger asChild>
              <Button className="w-full bg-blue-600">Add Todo</Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader>
                <h2>{isEditing ? "Edit Todo" : "Add Todo"}</h2>
                <Input
                  placeholder="Add Todo title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <DrawerTitle>
                  <Input
                    placeholder="Add description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={handleAddTodo}>{isEditing ? "Update Todo" : "Submit"}</Button>
                <DrawerClose>
                  <Button className="w-full hover:bg-slate-800 hover:text-white" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>
  );
}
