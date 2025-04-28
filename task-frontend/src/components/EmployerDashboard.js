import React, { useEffect, useState } from 'react';
import api from '../api';

function EmployerDashboard() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks initially
  const fetchTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data);
  };

  // Update task progress by the employer
  const updateProgress = async (id, progress) => {
    try {
      await api.put(`/tasks/${id}/progress?progress=${progress}`);
      fetchTasks();  // Refresh tasks after updating progress
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    fetchTasks();  // Fetch tasks when the component mounts
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employer Dashboard</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="border p-4 mb-4 rounded shadow">
            <h3 className="text-xl">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="mt-2">Progress: {task.progress}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={task.progress}
              onChange={(e) => updateProgress(task.id, e.target.value)}
              className="w-full mt-2"
            />
            <EmailView taskId={task.id} />
          </div>
        ))
      )}
    </div>
  );
}

function EmailView({ taskId }) {
  const [emailContent, setEmailContent] = useState('');

  // Fetch the email content for a specific task
  const fetchEmail = async () => {
    const response = await api.get(`/tasks/${taskId}/email`);
    setEmailContent(response.data);  // Set the email content to display
  };

  useEffect(() => {
    fetchEmail();  // Fetch email whenever the taskId changes
  }, [taskId]);

  return (
    <div className="mt-4 bg-gray-100 p-2 rounded">
      <h4 className="font-semibold">Email Received:</h4>
      <pre className="text-sm whitespace-pre-wrap">{emailContent}</pre>  {/* Display email content */}
    </div>
  );
}

export default EmployerDashboard;
