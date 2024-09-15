import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, update, remove, onValue } from "firebase/database";
import  db  from '../firebase';

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const taskRef = ref(db, `todos/${id}`);
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTask(data);
      }
    });
  }, [id]);

  const updateTask = () => {
    const taskRef = ref(db, `todos/${id}`);
    if (task.title.trim() && task.description.trim()) {
      update(taskRef, task)
        .then(() => {
          console.log("Task updated successfully");
        })
        .catch((error) => {
          console.error("Error updating task: ", error);
        });
    } else {
      alert("Task title and description cannot be empty");
    }
  };

  const deleteTask = () => {
    const taskRef = ref(db, `todos/${id}`);
    remove(taskRef)
      .then(() => {
        console.log("Task deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{task.title}</h1>
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
      />
      <button onClick={updateTask}>Обновить</button>
      <button onClick={deleteTask}>Удалить</button>
    </div>
  );
};

export default TaskPage;
