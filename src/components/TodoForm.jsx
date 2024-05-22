"use client"
import { addTodo, updateTodo } from "@/actions/todo"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { Edit } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const initialState = {
	title: null,
}

const TodoForm = ({ initialData }) => {
	const [todo, setTodo] = useState(initialData ?? initialState)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const closeDrawer = () => setIsDrawerOpen(false)

	const handleAddTodo = async () => {
		try {
			await addTodo(todo)
			setTodo(initialState)
			closeDrawer()
		} catch (error) {
			console.error("Error adding todo:", error)
		}
	}

	const handleUpdateTodo = async () => {
		try {
			await updateTodo(initialData._id, { title: todo.title })
			setTodo(initialState)
			closeDrawer()
		} catch (error) {
			console.error("Error updating todo:", error)
		}
	}

	return (
		<Drawer
			open={isDrawerOpen}
			onOpenChange={setIsDrawerOpen}
			className="w-full max-w-md"
		>
			<DrawerTrigger asChild>
				<Button
					className={cn(
						initialData
							? "h-[unset] p-2 hover:text-blue-500"
							: "w-full bg-blue-600"
					)}
					variant={initialData ? "outline" : "default"}
					onClick={() => setIsDrawerOpen(true)}
				>
					{initialData ? (
						<>
							<Edit
								className="hover:text-blue-600"
								size={12}
							/>
						</>
					) : (
						"Add Todo"
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="mx-auto flex max-w-md gap-4">
				<DrawerHeader className="grid w-full gap-4">
					<h2>{initialData ? "Edit Todo" : "Add Todo"}</h2>
					<DrawerTitle>
						<Input
							placeholder={`${initialData ? "Edit" : "Add"} Todo`}
							value={todo.title}
							onChange={e =>
								setTodo(prev => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>
					</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter className="grid w-full grid-cols-2 gap-4">
					<Button
						onClick={initialData ? handleUpdateTodo : handleAddTodo}
					>
						{initialData ? "Update Todo" : "Submit"}
					</Button>
					<DrawerClose>
						<Button
							className="w-full"
							variant="outline"
							onClick={closeDrawer}
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default TodoForm
