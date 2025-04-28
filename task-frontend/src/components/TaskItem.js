import React, { useState } from 'react';
import api from '../api';

function TaskItem({ task, onUpdate }) {
  const [emailText , setEmailText] = useState('');
  const [selectedType, setSelectedType] = useState('TASK_COMPLETION'); // default selection

  const generateEmail = async (emailType) => {
    try {
      const response = await api.post(`/tasks/${task.id}/send-email?type=${emailType}`);
      setEmailText(response.data.emailContent);
      alert(`Email Sent: \n\n${response.data.emailContent}`);
      onUpdate();  // Call onUpdate to refresh task list after sending email
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  const toggleComplete = async () => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed }); 
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
      <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={toggleComplete} style={{ marginRight: '10px' }}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={deleteTask}>Delete</button>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        style={{ marginRight: '10px' }}
      >
        <option value="TASK_COMPLETION">Completion Email</option>
        <option value="TASK_ASSIGNMENT">Assignment Email</option>
        <option value="TASK_REMINDER">Reminder Email</option>
      </select>
      <button onClick={generateEmail}>Generate Email</button>
      {emailText && (
        <div style={{ marginTop: '15px', padding: '10px', border: '1px dashed blue', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
          <strong>Generated Email:</strong>
          <pre>{emailText}</pre>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
