import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user profile and posts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch user's posts
        const postsRes = await axios.get(`http://localhost:5000/api/posts?author=${userRes.data._id}`);
        setPosts(postsRes.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile. Please try again.');
      }
    };
    fetchUserProfile();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore My Space:Manage your profile and preferences here!</h1>
      {error && <p style={styles.error}>{error}</p>}
      {user ? (
        <div style={styles.profileContent}>
          <p style={styles.profileText}>Username: {user.username}</p>

          {/* Logout Button */}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>

          {/* Display user's posts */}
          <h2 style={styles.postsHeading}>Your Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} style={styles.postContainer}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postContent}>{post.content}</p>
                <p style={styles.postDate}>
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p style={styles.noPosts}>No posts found.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    minHeight: '100vh', // Ensure the container takes the full viewport height
    width: '100vw',
    padding: '2rem',
    backgroundColor: '#f5f5f5', // Light background color
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginTop: '80px',
    marginBottom: '1rem',
  },
  profileContent: {
    width: '100%',
    maxWidth: '800px', // Limit content width for better readability
    backgroundColor: '#fff', // White background for content
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
  profileText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background-color 0.3s ease',
  },
  postsHeading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  postTitle: {
    color: '#333',
    marginBottom: '0.5rem',
  },
  postContent: {
    color: '#555',
    marginBottom: '0.5rem',
  },
  postDate: {
    color: '#777',
    fontSize: '0.9rem',
  },
  noPosts: {
    color: '#777',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
};

export default Profile;