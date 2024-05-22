import { deleteTodo, getTodos } from "@/actions/todo"
import TodoForm from "@/components/TodoForm"
import { Button } from "@/components/ui/button"
import { sleep } from "@/lib/utils"
import { Trash2 } from "lucide-react"

export default async function Home() {
	await sleep(5000)
	const { data: todos } = await getTodos()

	const handleDeleteTodo = id => async () => {
		"use server"
		await deleteTodo(id)
	}

	return (
		<>
			<div className="flex w-full flex-1 flex-col justify-start gap-4 overflow-auto p-4 scrollbar">
				{todos.map(todo => (
					<div
						key={todo._id}
						className="flex flex-col rounded-md border border-slate-500 px-5 py-3 shadow-lg"
					>
						<div className="flex w-full items-center justify-between gap-4">
							<p className="text-sm">{todo.title}</p>
							<div className="flex gap-4">
								<TodoForm initialData={todo} />

								<form action={handleDeleteTodo(todo._id)}>
									<Button
										variant="outline"
										className="h-[unset] p-2 hover:text-red-500"
									>
										<Trash2
											className="hover:text-red-600"
											size={12}
										/>
									</Button>
								</form>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
