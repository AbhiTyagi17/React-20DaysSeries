// src/Assignment_11/CustomHooksDemo.js
import React from 'react';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';

function CustomHooksDemo() {
  // 🪝 Custom Hook 1: persistent note
  const [note, setNote] = useLocalStorage('myNote', '');

  // 🪝 Custom Hook 2: fetch users
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  return (
    <div style={containerStyle}>
      <h2>🪝 Custom Hooks Demo</h2>

      {/* ---------- Section 1: Persistent Note ---------- */}
      <section style={sectionStyle}>
        <h3>📝 Persistent Note (useLocalStorage)</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Type something. It saves automatically. Refresh the page — your note
          will still be here!
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          rows={4}
          style={textareaStyle}
        />

        <p style={{ color: '#28a745', fontSize: '14px' }}>
          💾 Note saved automatically ({note.length} characters)
        </p>

        <button
          onClick={() => window.location.reload()}
          style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
        >
          🔄 Reload Page
        </button>
        <button
          onClick={() => setNote('')}
          style={{ ...buttonStyle, backgroundColor: '#dc3545', marginLeft: '10px' }}
        >
          🗑️ Clear Note
        </button>
      </section>

      {/* ---------- Section 2: Fetch Users ---------- */}
      <section style={sectionStyle}>
        <h3>👥 Users from API (useFetch)</h3>

        {loading && <p style={infoStyle}>⏳ Loading users...</p>}

        {error && <p style={errorStyle}>❌ Error: {error}</p>}

        {!loading && !error && users && (
          <ul style={{ paddingLeft: '20px' }}>
            {users.map((user) => (
              <li key={user.id} style={{ marginBottom: '6px' }}>
                <strong>{user.name}</strong> — {user.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  maxWidth: '700px',
  margin: '40px auto',
  padding: '25px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
};

const sectionStyle = {
  marginBottom: '25px',
  paddingBottom: '20px',
  borderBottom: '1px solid #eee',
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '2px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  resize: 'vertical',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 18px',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const infoStyle = {
  color: '#007bff',
  fontStyle: 'italic',
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #f5c6cb',
};

export default CustomHooksDemo;