import React, { useState, useEffect } from "react";
import { ref, onValue, push, remove, update } from "firebase/database";
import db  from './firebase';
import './app.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");


	// Получение списка дел при загрузке компонента
	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		const todoRef = ref(db, 'todos');
		onValue(todoRef, (snapshot) => {
			const todosData = snapshot.val();
			const todosList = [];
			for (let id in todosData) {
				todosList.push({ id, ...todosData[id] });
			}
			setTodos(todosList);
		});
	};

	// Добавление нового дела
	const addTodo = () => {
		if (!newTodo) return;
		const todoRef = ref(db, 'todos');
		push(todoRef, {
			title: newTodo,
			completed: false
		});
		setNewTodo("");
	};

	// Удаление дела
	const deleteTodo = (id) => {
		const todoRef = ref(db, `todos/${id}`);
		remove(todoRef);
	};

	// Обновление дела
	const updateTodo = (id, updatedTitle) => {
		const todoRef = ref(db, `todos/${id}`);
		update(todoRef, { title: updatedTitle });
	};

	return (
		<div className="App">
			<div className="container">
				<h1>Todo List</h1>
				{/* Поле для добавления дела */}
				<div className="input-section">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="Введите новую задачу"
					/>
					<button onClick={addTodo}>Добавить</button>
				</div>
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="text"
								value={todo.title}
								onChange={(e) => updateTodo(todo.id, e.target.value)}
							/>
							<button onClick={() => deleteTodo(todo.id)}>Delete</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
