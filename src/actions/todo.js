"use server"

import { revalidateTag } from "next/cache"

// actions.js
const API_BASE_URL = "https://api.freeapi.app/api/v1/todos"

export const getTodos = async () => {
	try {
		const res = await fetch(API_BASE_URL, { next: { tags: ["todos"] } })
		if (!res.ok) {
			throw new Error("Failed to fetch todos")
		}
		return await res.json()
	} catch (error) {
		console.error("Error loading todos:", error)
	}
}

export const addTodo = async todo => {
	try {
		const res = await fetch(`${API_BASE_URL}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo),
		})
		if (!res.ok) {
			throw new Error("Failed to add todo")
		}
		revalidateTag("todos")
		const data = await res.json()
		return data
	} catch (error) {
		console.error("Error adding todo:", error)
	}
}

export const updateTodo = async (id, updatedData) => {
	console.log(updatedData)
	try {
		const res = await fetch(`${API_BASE_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedData),
		})
		if (!res.ok) {
			throw new Error("Failed to update todo")
		}
		revalidateTag("todos")
		return await res.json()
	} catch (error) {
		console.error("Error updating todo:", error)
	}
}

export const deleteTodo = async id => {
	try {
		const res = await fetch(`${API_BASE_URL}/${id}`, {
			method: "DELETE",
		})
		if (!res.ok) {
			throw new Error("Failed to delete todo")
		}
		revalidateTag("todos")
		return await res.json()
	} catch (error) {
		console.error("Error deleting todo:", error)
	}
}
