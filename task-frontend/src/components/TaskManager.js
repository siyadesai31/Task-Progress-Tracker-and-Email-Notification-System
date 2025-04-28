import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskManager() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleTaskAdded = () => {
    setReloadFlag(!reloadFlag); // Toggle to reload
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={reloadFlag} /> {/* Key forces re-render */}
    </div>
  );
}

export default TaskManager;
