import React, { useState, useRef, useEffect } from 'react';

function RefPlayground() {
  // ---------- Section 1: Auto-focus ----------
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current.focus();
  }, []);

  const handleFocusClick = () => {
    inputRef.current.focus();
  };

  // ---------- Section 2: Previous Value Tracker ----------
  const [text, setText] = useState('');
  const previousTextRef = useRef('');
  const renderCountRef = useRef(0);

  // Increment render count on every render (safe because it's in ref)
  renderCountRef.current += 1;

  // Update previous value AFTER render (in an effect)
  useEffect(() => {
    previousTextRef.current = text;
  }, [text]);

  // ---------- Section 3: Stopwatch ----------
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // Stores the interval ID

  const startTimer = () => {
    if (isRunning) return; // Prevent double intervals
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <h2> useRef Playground</h2>

      {/* ---------- Section 1: Auto-focus ---------- */}
      <section style={sectionStyle}>
        <h3>1️ Auto-Focus Demo</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          The input below is auto-focused on page load.
        </p>
        <input
          ref={inputRef}
          type="text"
          placeholder="I get focused automatically!"
          style={inputStyle}
        />
        <button onClick={handleFocusClick} style={buttonStyle}>
           Focus Input
        </button>
      </section>

      {/* ---------- Section 2: Previous Value ---------- */}
      <section style={sectionStyle}>
        <h3>2️ Previous Value Tracker</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Type below to see your current and previous input.
        </p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={inputStyle}
        />
        <div style={infoBoxStyle}>
          <p>
            <strong>Current:</strong> {text || '(empty)'}
          </p>
          <p>
            <strong>Previous:</strong>{' '}
            {previousTextRef.current || '(empty)'}
          </p>
          <p style={{ color: '#007bff' }}>
            <strong> Render count:</strong> {renderCountRef.current}
          </p>
        </div>
      </section>

      {/* ---------- Section 3: Stopwatch ---------- */}
      <section style={sectionStyle}>
        <h3> Stopwatch (Interval stored in useRef)</h3>
        <div style={stopwatchDisplay}>
           {seconds} {seconds === 1 ? 'second' : 'seconds'}
        </div>
        <div>
          <button
            onClick={startTimer}
            disabled={isRunning}
            style={{
              ...buttonStyle,
              backgroundColor: isRunning ? '#6c757d' : '#28a745',
              cursor: isRunning ? 'not-allowed' : 'pointer',
            }}
          >
             Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            style={{
              ...buttonStyle,
              backgroundColor: !isRunning ? '#6c757d' : '#ffc107',
              color: !isRunning ? 'white' : '#000',
              cursor: !isRunning ? 'not-allowed' : 'pointer',
            }}
          >
             Stop
          </button>
          <button
            onClick={resetTimer}
            style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
          >
        	 Reset
          </button>
        </div>
      </section>
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
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
};

const sectionStyle = {
  marginBottom: '30px',
  paddingBottom: '20px',
  borderBottom: '1px solid #eee',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '2px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 18px',
  margin: '4px 6px 4px 0',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#007bff',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const infoBoxStyle = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '16px',
  lineHeight: '1.6',
};

const stopwatchDisplay = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#007bff',
  textAlign: 'center',
  margin: '15px 0',
  padding: '15px',
  backgroundColor: '#f0f8ff',
  borderRadius: '8px',
};

export default RefPlayground;