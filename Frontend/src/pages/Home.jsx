import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null); // Track post to update

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post creation
  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post at the top
    setShowPostForm(false); // Hide form after submission
  };

  // Handle post update
  const handleUpdate = (postId) => {
    const post = posts.find((p) => p._id === postId);
    setPostToUpdate(post); // Set the post to update
    setShowPostForm(true); // Show the form
  };

  // Handle post deletion
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId)); // Remove post from list
      alert('Post deleted successfully!');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>From the Desk: Explore our newest articles!</h1>

      <button
        onClick={() => setShowPostForm(!showPostForm)}
        style={styles.button}
      >
        {showPostForm ? 'Cancel' : 'Create New Post'}
      </button>

      {showPostForm && (
        <PostForm
          onNewPost={handleNewPost}
          postToUpdate={postToUpdate}
          setPostToUpdate={setPostToUpdate}
        />
      )}

      <PostList posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
    minHeight: '100vh', // Ensure the container takes the full viewport height
    width:'100vw',
    padding: '2rem',
    backgroundColor: '#f5f5f5', // Light background color
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
    marginTop: '80px',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
};

export default Home;