
"use client";
import React, { useState } from 'react';
import { updateTodo, addTodo } from '@/actions/page';
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
import { Button } from './ui/button';
import { Input } from './ui/input';

const initialState = {}

const TodoForm = ({ closeDrawer, onAddTodo, onUpdateTodo, selectedTodo, isEditing }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [todo, setTodo] = useState("")
    const [title, setTitle] = useState(selectedTodo?.title || "");
    const [newDescription, setNewDescription] = useState(selectedTodo?.description || "");

    const handleAddTodo = async () => {
        // const todo = { title: title, description: newDescription };
        try {
            const newTodo = await addTodo(todo);
            // Add the new todo to the parent state
            setTitle(title);
            setNewDescription(newDescription);
            setIsDrawerOpen(false);
            return newTodo;
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleUpdateTodo = async () => {
        const todo = { title: newTitle, description: newDescription, id: selectedTodo.id };
        try {
            const updatedTodo = await updateTodo(todo.id, todo);
            onUpdateTodo(updatedTodo);  // Update the parent state with the updated todo
            setTitle("");
            setNewDescription("");
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className='w-full pb-4'>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} className="max-w-md w-full">
                <DrawerTrigger asChild>
                    <Button className="w-full bg-blue-600" onClick={() => setIsDrawerOpen(true)}>Add Todo</Button>
                </DrawerTrigger>
                <DrawerContent className="max-w-md mx-auto flex gap-4">
                    <DrawerHeader className="grid w-full gap-4">
                        <h2>{isEditing ? "Edit Todo" : "Add Todo"}</h2>
                        <DrawerTitle>
                            <Input
                                placeholder="Add Todo title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                    <DrawerFooter className="grid w-full grid-cols-2 gap-4">
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
    );
}

export default TodoForm;
