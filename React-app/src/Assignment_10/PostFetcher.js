import  { useState, useEffect } from 'react';

function PostsFetcher() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        { signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      // Ignore abort errors (they happen when the component unmounts)
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    // Return the controller so we can abort if needed
    return controller;
  };

  // ---- Effect 1: Fetch posts on mount ----
  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    // Cleanup: abort the fetch if component unmounts
    return () => controller.abort();
  }, []); // Empty array = runs only on mount

  // ---- Effect 2: Update document title whenever posts change ----
  useEffect(() => {
    document.title = `Posts (${posts.length})`;
  }, [posts]); // Runs whenever 'posts' changes

  // ---- Handle refresh ----
  const handleRefresh = () => {
    fetchPosts(); // Re-fetch
  };

  // ---- Render ----
  return (
    <div style={containerStyle}>
      <h2>Posts Fetcher</h2>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        disabled={loading}
        style={{
          ...buttonStyle,
          backgroundColor: loading ? '#6c757d' : '#007bff',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      {/* Loading state */}
      {loading && <p style={infoStyle}>Loading posts...</p>}

      {/* Error state */}
      {error && <p style={errorStyle}>Error: {error}</p>}

      {/* Posts list */}
      {!loading && !error && (
        <div style={listStyle}>
          {posts.length === 0 ? (
            <p style={{ color: '#6c757d' }}>No posts found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {posts.map((post) => (
                <li key={post.id} style={postItemStyle}>
                  <h4 style={{ margin: '0 0 4px 0' }}>
                    #{post.id} – {post.title}
                  </h4>
                  <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
                    {post.body.length > 100
                      ? post.body.slice(0, 100) + '...'
                      : post.body}
                  </p>
                  <hr style={{ margin: '10px 0', border: '1px solid #eee' }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
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

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const infoStyle = {
  textAlign: 'center',
  fontSize: '18px',
  color: '#007bff',
  padding: '20px',
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '15px',
  borderRadius: '6px',
  border: '1px solid #f5c6cb',
};

const listStyle = {
  marginTop: '15px',
};

const postItemStyle = {
  backgroundColor: '#fafafa',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '12px',
  border: '1px solid #e9ecef',
  transition: 'box-shadow 0.2s ease',
};

export default PostsFetcher;