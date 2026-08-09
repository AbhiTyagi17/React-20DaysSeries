// src/Assignment_5/UserDashboard.js

// Assignment 5 – User Dashboard
// Create a component called UserDashboard that manages user status and renders different UI depending on state.
// State variables:
// isLoggedIn – boolean (default: false).
// role – string, can be 'admin', 'editor', or 'viewer' (default: 'viewer').
// notificationCount – number (default: 0).

// Requirements:

// If isLoggedIn is false:

// Show a <h2> saying "🔒 Please log in to continue".

// Show a "Login" button that sets isLoggedIn to true.

// If isLoggedIn is true:

// Show a welcome message: "👋 Welcome, [role]!" (replace [role] with the actual role).

// Using &&: If notificationCount > 0, show a notification badge: "🔔 You have X new messages". If 0, show nothing.

// Using ternary: Show a panel title:

// If role === 'admin' → "🛠️ Admin Dashboard"

// If role === 'editor' → "✏️ Editor Workspace"

// If role === 'viewer' → "👀 Viewer Mode"

// Buttons:

// "Logout" → sets isLoggedIn to false.

// "Set Admin", "Set Editor", "Set Viewer" → updates the role.

// "Add Notification" → increments notificationCount by 1.

// "Clear Notifications" → sets notificationCount to 0.


import {useState } from 'react';

function UserDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('viewer');
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handleRoleChange = (newRole) => setRole(newRole);

  const addNotification = () => setNotificationCount(prev => prev + 1);
  const clearNotifications = () => setNotificationCount(0);

  if (!isLoggedIn) {
    return (
      <div style={cardStyle}>
        <h2>Please log in to continue</h2>
        <button onClick={handleLogin} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
          Login
        </button>
      </div>
    );
  }


  let panelTitle;
  if (role === 'admin') panelTitle = 'Admin Dashboard';
  else if (role === 'editor') panelTitle = 'Editor Workspace';
  else panelTitle = 'Viewer Mode';

  return (
    <div style={cardStyle}>
      <h2>Welcome, {role}!</h2>

      <h3 style={{ color: '#007bff' }}>
        {role === 'admin' ? 'Admin Dashboard' :
         role === 'editor' ? 'Editor Workspace' :
         'Viewer Mode'}
      </h3>

      {notificationCount > 0 && (
        <div style={notificationBadge}>
          You have {notificationCount} new message{notificationCount > 1 ? 's' : ''}
        </div>
      )}

      <div style={{ margin: '15px 0' }}>
        <button onClick={() => handleRoleChange('admin')} style={buttonStyle}>
          Set Admin
        </button>
        <button onClick={() => handleRoleChange('editor')} style={buttonStyle}>
          Set Editor
        </button>
        <button onClick={() => handleRoleChange('viewer')} style={buttonStyle}>
          Set Viewer
        </button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <button onClick={addNotification} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#000' }}>
          Add Notification
        </button>
        <button onClick={clearNotifications} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
          Clear All
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '8px 16px',
  margin: '5px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const notificationBadge = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #f5c6cb',
  margin: '15px 0',
};

export default UserDashboard;