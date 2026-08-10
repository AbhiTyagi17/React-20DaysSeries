// src/Assignment_6/TaskManager.js
import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', isCompleted: true },
    { id: 2, text: 'Build a project', isCompleted: false },
    { id: 3, text: 'Master hooks', isCompleted: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleInputChange = (e) => setNewTaskText(e.target.value);

  const addTask = () => {
    if (newTaskText.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const newTask = {
      id: Date.now(), 
      text: newTaskText.trim(),
      isCompleted: false,
    };

    setTasks([...tasks, newTask]); 
    setNewTaskText(''); 
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div style={containerStyle}>
      <h2>Task Manager</h2>

      <div style={addSectionStyle}>
        <input
          type="text"
          value={newTaskText}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
          style={inputStyle}
        />
        <button onClick={addTask} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
        	Add Task
        </button>
      </div>

      <div style={statsStyle}>
        <span>Total: {totalTasks}</span>
        <span>Completed: {completedTasks}</span>
        <span>Pending: {pendingTasks}</span>
      </div>

      {tasks.length === 0 ? (
        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={listStyle}>
          {tasks.map((task) => (
            <li key={task.id} style={listItemStyle}>
              <span
                onClick={() => toggleTask(task.id)}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? '#6c757d' : '#000',
                }}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ ...buttonStyle, backgroundColor: '#dc3545', marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '25px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
};

const addSectionStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '15px',
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px 16px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const statsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  marginBottom: '20px',
  fontWeight: 'bold',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fafafa',
  borderRadius: '4px',
  marginBottom: '8px',
};

export default TaskManager;