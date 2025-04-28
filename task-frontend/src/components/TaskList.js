import React, { useEffect, useState } from 'react';
import api from '../api';
import TaskItem from './TaskItem'; 

function TaskList({ reloadFlag }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, [reloadFlag]); 

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={() => window.location.reload()} />
        ))
      )}
    </div>
  );
}

export default TaskList;
