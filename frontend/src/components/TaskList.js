import React, { useState, useEffect } from 'react';
import './TaskList.css';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tasks', {
          method: 'GET',
          headers: {
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>Title:</strong> {task.title}<br />
              <strong>Description:</strong> {task.description || 'N/A'}<br />
              <strong>Due Date:</strong> {task.dueDate || 'N/A'}<br />
              <strong>Assigned To:</strong> {task.assignedTo || 'N/A'}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
