import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ onNewPost, postToUpdate, setPostToUpdate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (postToUpdate) {
      setTitle(postToUpdate.title);
      setContent(postToUpdate.content);
      setTags(postToUpdate.tags.join(', '));
    }
  }, [postToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const postData = {
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim()),
      };

      let res;
      if (postToUpdate) {
        res = await axios.put(
          `http://localhost:5000/api/posts/${postToUpdate._id}`,
          postData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Post updated successfully!');
      } else {
        res = await axios.post('http://localhost:5000/api/posts', postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Post created successfully!');
      }

      onNewPost(res.data);
      setPostToUpdate(null);
      setTitle('');
      setContent('');
      setTags('');
      navigate('/');
    } catch (err) {
      console.error('Error submitting post:', err);
      setError(err.response?.data?.error || 'Failed to submit post. Please try again.');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h1 style={styles.formHeading}>{postToUpdate ? 'Update Post' : 'Create New Post'}</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          {postToUpdate ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

// Modern and clean CSS design
const styles = {
  formContainer: {
    maxWidth: '800px',
    width:'100%',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  formHeading: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#28a745', // Green border on focus
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    minHeight: '150px',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textareaFocus: {
    borderColor: '#28a745', // Green border on focus
  },
  submitButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#28a745', // Green background
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    fontWeight: '600',
  },
  submitButtonHover: {
    backgroundColor: '#218838', // Darker green on hover
    transform: 'scale(1.02)', // Slight scale effect
  },
  error: {
    color: '#dc3545', // Red for errors
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
};

export default PostForm;
