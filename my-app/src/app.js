import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import './app.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSorted, setIsSorted] = useState(false);

	// Получение списка дел при загрузке компонента
	useEffect(() => {
		fetchTodos();
	}, []);

	// Функция для получения дел из JSON Server
	const fetchTodos = () => {
		axios
			.get("http://localhost:3001/todos")
			.then((response) => {
				setTodos(response.data);
			})
			.catch((error) => console.error("Error fetching the todos:", error));
	};

	// Добавление нового дела
	const addTodo = () => {
		if (!newTodo) return;
		axios
			.post("http://localhost:3001/todos", { title: newTodo, completed: false })
			.then((response) => {
				setTodos([...todos, response.data]);
				setNewTodo("");
			});
	};

	// Удаление дела
	const deleteTodo = (id) => {
		axios.delete(`http://localhost:3001/todos/${id}`).then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
		});
	};

	// Обновление дела (изменение названия)
	const updateTodo = (id, updatedTitle) => {
		axios
			.put(`http://localhost:3001/todos/${id}`, { title: updatedTitle })
			.then((response) => {
				setTodos(
					todos.map((todo) => (todo.id === id ? response.data : todo))
				);
			});
	};

	// Поиск дел по введенной фразе с использованием debounce
	const debouncedSearch = useCallback(
		debounce((query) => {
			axios
				.get(`http://localhost:3001/todos?q=${query}`)
				.then((response) => {
					setTodos(response.data);
				});
		}, 300),
		[]
	);

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		debouncedSearch(query);
	};

	// Сортировка дел по алфавиту
	const handleSort = () => {
		const sortedTodos = [...todos].sort((a, b) =>
			a.title.localeCompare(b.title)
		);
		setIsSorted(!isSorted);
		setTodos(isSorted ? todos : sortedTodos);
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
					<button onClick={addTodo}>Add</button>
				</div>

				{/* Поиск по делам */}
				<div className="search-section">
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearch}
						placeholder="Поиск задач"
					/>
				</div>

				{/* Кнопка для сортировки */}
				<button className="sort-button" onClick={handleSort}>
					{isSorted ? "Отсортировать" : "Сортировать по алфавиту"}
				</button>

				{/* Список дел */}
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
