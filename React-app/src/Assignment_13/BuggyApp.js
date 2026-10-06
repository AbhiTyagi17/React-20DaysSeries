// src/Assignment_13/BuggyApp.js
import React, { useState, useEffect } from 'react';

function FixedApp() {
  // ✅ FIX 1: useState(0) is correct — but ensure it's a value, not a function call
  const [count, setCount] = useState(0);
  const [fruits, setFruits] = useState(['Apple', 'Banana']);
  const [newFruit, setNewFruit] = useState('');
  const [user, setUser] = useState(null);

  // ✅ FIX 2: Added an empty dependency array so it runs only once on mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Fetch failed:', err));
  }, []); // ⬅️ This is the fix

  // ✅ FIX 3: Use spread to create a NEW array instead of mutating
  const addFruit = () => {
    if (newFruit.trim() === '') return;
    setFruits([...fruits, newFruit]); // ⬅️ New array
    setNewFruit('');
  };

  // ✅ FIX 4: Corrected filter — keep items where index does NOT match
  const removeFruit = (index) => {
    const updated = fruits.filter((_, i) => i !== index); // ⬅️ `!==` instead of `===`
    setFruits(updated);
  };

  // ✅ FIX 5: This was fine — but see note below for a safer version
  const decrement = () => setCount((prev) => prev - 1); // ⬅️ Functional update (safer)

  // ✅ FIX 6: Hooks must NOT be called conditionally.
  // Move the effect out of the `if` block and put the condition INSIDE.
  useEffect(() => {
    if (count > 5) {
      console.log('Count is greater than 5!');
    }
  }, [count]); // ⬅️ Condition moved inside the effect

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>✅ Fixed App</h2>

      {/* Counter */}
      <h3>Count: {count}</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      {/* Fruits */}
      <h3>Fruits ({fruits.length}):</h3>
      <ul>
        {fruits.map((fruit, index) => (
          // ⚠️ Using index as key is OK here because the list doesn't reorder.
          // For real apps, use a stable unique ID.
          <li key={index}>
            {fruit}{' '}
            <button onClick={() => removeFruit(index)}>❌</button>
          </li>
        ))}
      </ul>
      <input
        value={newFruit}
        onChange={(e) => setNewFruit(e.target.value)}
        placeholder="Add a fruit..."
      />
      <button onClick={addFruit}>Add Fruit</button>

      {/* User Info */}
      <h3>User Info:</h3>
      {user ? <p>Name: {user.name}</p> : <p>Loading...</p>}
    </div>
  );
}

export default FixedApp;