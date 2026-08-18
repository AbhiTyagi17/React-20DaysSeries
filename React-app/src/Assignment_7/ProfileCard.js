import React, { useState } from 'react';
import styles from './ProfileCard.module.css'; 

function ProfileCard() {
  const [theme, setTheme] = useState('light');

  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#1a1a2e',
    },
    dark: {
      backgroundColor: '#1a1a2e',
      color: '#f0f0f0',
    },
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const buttonInlineStyles = {
    backgroundColor: theme === 'light' ? '#6c63ff' : '#ff6b6b',
    color: '#ffffff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  };

  return (
      <div
      className={`
        ${styles.card} 
        ${theme === 'light' ? styles.lightTheme : styles.darkTheme}
      `}
      style={themeStyles[theme]}
    >

      <img
        src="https://i.pravatar.cc/150?img=5"
        alt="Jane Doe avatar"
        className={styles.avatar}
      />

      <h2 className={styles.name}>Jane Doe</h2>

      <p className={styles.bio}>
        Full-stack developer passionate about React and UI/UX design.
      </p>

      <button onClick={toggleTheme} style={buttonInlineStyles}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default ProfileCard;