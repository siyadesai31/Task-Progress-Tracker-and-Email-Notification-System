import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import api from '../api';

function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>
      <TaskForm onTaskAdded={fetchTasks} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
      ))}
    </div>
  );
}

export default ManagerDashboard;
