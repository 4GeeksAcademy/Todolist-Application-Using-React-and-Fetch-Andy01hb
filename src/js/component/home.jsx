// src/js/component/home.jsx
import React, { useState, useEffect } from "react";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch initial tasks from API
    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/yourusername')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const addTodo = () => {
        const updatedTodos = [...todos, { label: newTodo, done: false }];
        setTodos(updatedTodos);
        setNewTodo('');

        // Enviar nuevo todo a la API con POST
        fetch('https://assets.breatheco.de/apis/fake/todos/user/yourusername', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodos)
        })
        .then(response => response.json())
        .then(data => console.log('Todos updated:', data))
        .catch(error => console.error('Error updating todos:', error));
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);

        // Actualizar la lista de tareas en la API
        fetch('https://assets.breatheco.de/apis/fake/todos/user/yourusername', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodos)
        })
        .then(response => response.json())
        .then(data => console.log('Todos updated:', data))
        .catch(error => console.error('Error updating todos:', error));
    };

    return (
        <div className="text-center mt-5">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button onClick={addTodo}>Add Task</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.label}
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
