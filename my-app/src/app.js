import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TaskPage from "./components/TaskPage";
import NotFoundPage from "./components/NotFoundPage";
import './app.css'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TodoList />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
