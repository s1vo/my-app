import React from 'react';
import './app.css';
import { TodoProvider, useTodo } from './TodoContext';

const App = () => {
	return (
		<TodoProvider>
			<TodoApp />
		</TodoProvider>
	);
};

const TodoApp = () => {
	const { todos, addTodo, removeTodo } = useTodo();
	const [newTodo, setNewTodo] = React.useState("");

	const handleAddTodo = () => {
		if (newTodo.trim() !== "") {
			addTodo({
				id: Date.now(),
				text: newTodo,
			});
			setNewTodo("");
		}
	};

	return (
		<div className="container">
			<h1>To-do List</h1>
			<div className="input-section">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<button onClick={handleAddTodo}>Добавить</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<span>{todo.text}</span>
						<button onClick={() => removeTodo(todo.id)}>Удалить</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
