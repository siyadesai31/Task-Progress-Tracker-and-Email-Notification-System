import React, { useState } from 'react';
import api from '../api';

function TaskForm({ onTaskAdded }) { // ✅ Now it accepts a callback
  const [task, setTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { ...task, completed: false });
      console.log('Task added:', response.data);

      setTask({ title: '', description: '' });
      setSuccessMessage('Task added successfully!');
      setError(null);

      if (onTaskAdded) {
        onTaskAdded(); // ✅ Notify parent to refresh task list
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to add task');
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default TaskForm;
