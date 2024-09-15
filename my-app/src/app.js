import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './app.module.css';

const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/todos')
			.then(response => {
				setTodos(response.data.slice(0, 20)); // Отображаем первые 10 дел
			})
			.catch(error => console.error('Error fetching the todos:', error));
	}, []);

	return (
		<div className={styles.container}>
			<h1>Todo List</h1>
			<ul>
				{todos.map(todo => (
					<li key={todo.id} className={todo.completed ? 'styles.completed' : ''}>
						{todo.title}
						<button>X</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
