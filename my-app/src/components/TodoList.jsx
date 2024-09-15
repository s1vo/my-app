import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue, push } from "firebase/database";
import db  from '../firebase';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const todoRef = ref(db, 'todos');
    onValue(todoRef, (snapshot) => {
      const todosData = snapshot.val();
      const todosList = [];
      for (let id in todosData) {
        todosList.push({ id, ...todosData[id] });
      }
      setTodos(todosList);
    });
  }, []);

  const addTodo = () => {
    if (!newTodo) return;
    const todoRef = ref(db, 'todos');
    push(todoRef, {
      title: newTodo,
      description: newTodo,
      completed: false
    });
    setNewTodo("");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
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
            {/* Обрезаем текст задачи и добавляем ссылку на страницу задачи */}
            <Link to={`/task/${todo.id}`}>
              {todo.title.length > 50 ? `${todo.title.substring(0, 50)}...` : todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
