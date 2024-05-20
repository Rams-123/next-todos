export const API_BASE_URL = 'https://dummyjson.com/todos';

export const getTodo = async () => {
    try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) {
            throw new Error('Failed to fetch todos');
        }
        return res.json();
    } catch (error) {
        console.error('Error loading todos:', error);
    }
};

export const addTodo = async (todo, userId) => {
    try {
        const res = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo,
                completed: false,
                userId,
            }),
        });
        if (!res.ok) {
            throw new Error('Failed to add todo');
        }
        return res.json();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
};

export const updateTodo = async (id, updatedData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
            throw new Error('Failed to update todo');
        }
        return res.json();
    } catch (error) {
        console.error('Error updating todo:', error);
    }
};

export const deleteTodo = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('Failed to delete todo');
        }
        return res.json();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};
