// import React from 'react';

// const PostList = ({ posts }) => {
//   // Sort posts by date (most recent first)
//   const sortedPosts = [...posts].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   // Group posts by tags
//   const postsByTags = sortedPosts.reduce((acc, post) => {
//     post.tags.forEach((tag) => {
//       if (!acc[tag]) {
//         acc[tag] = [];
//       }
//       acc[tag].push(post);
//     });
//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.entries(postsByTags).map(([tag, posts]) => (
//         <div key={tag} style={styles.tagSection}>
//           <h2 style={styles.tagHeading}>#{tag}</h2>
//           {posts.map((post) => (
//             <div key={post._id} style={styles.postContainer}>
//               <h3 style={styles.postTitle}>{post.title}</h3>
//               <p style={styles.postContent}>{post.content}</p>
//               <p style={styles.postDate}>
//                 Posted on: {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   tagSection: {
//     marginBottom: '2rem',
//   },
//   tagHeading: {
//     color: '#007bff',
//     borderBottom: '2px solid #007bff',
//     paddingBottom: '0.5rem',
//     marginBottom: '1rem',
//   },
//   postContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: '1rem',
//     borderRadius: '8px',
//     marginBottom: '1rem',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   postTitle: {
//     color: '#333',
//     marginBottom: '0.5rem',
//   },
//   postContent: {
//     color: '#555',
//     marginBottom: '0.5rem',
//   },
//   postDate: {
//     color: '#777',
//     fontSize: '0.9rem',
//   },
// };

// export default PostList;

// import React from 'react';

// const PostList = ({ posts, onDelete, onUpdate }) => {
//   // Sort posts by date (most recent first)
//   const sortedPosts = [...posts].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   // Group posts by tags
//   const postsByTags = sortedPosts.reduce((acc, post) => {
//     post.tags.forEach((tag) => {
//       if (!acc[tag]) {
//         acc[tag] = [];
//       }
//       acc[tag].push(post);
//     });
//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.entries(postsByTags).map(([tag, posts]) => (
//         <div key={tag} style={styles.tagSection}>
//           <h2 style={styles.tagHeading}>#{tag}</h2>
//           {posts.map((post) => (
//             <div key={post._id} style={styles.postContainer}>
//               <h3 style={styles.postTitle}>{post.title}</h3>
//               <p style={styles.postContent}>{post.content}</p>
//               <p style={styles.postDate}>
//                 Posted on: {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//               {/* Update and Delete buttons */}
//               <div style={styles.buttonContainer}>
//                 <button
//                   style={styles.updateButton}
//                   onClick={() => onUpdate(post._id)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   style={styles.deleteButton}
//                   onClick={() => onDelete(post._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   tagSection: {
//     marginBottom: '2rem',
//   },
//   tagHeading: {
//     color: '#007bff',
//     borderBottom: '2px solid #007bff',
//     paddingBottom: '0.5rem',
//     marginBottom: '1rem',
//   },
//   postContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: '1rem',
//     borderRadius: '8px',
//     marginBottom: '1rem',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '800px',
//   },
//   postTitle: {
//     color: '#333',
//     marginBottom: '0.5rem',
//   },
//   postContent: {
//     color: '#555',
//     marginBottom: '0.5rem',
//   },
//   postDate: {
//     color: '#777',
//     fontSize: '0.9rem',
//   },
//   buttonContainer: {
//     display: 'flex',
//     gap: '0.5rem',
//     marginTop: '1rem',
//   },
//   updateButton: {
//     padding: '0.5rem',
//     fontSize: '0.9rem',
//     backgroundColor: '#28a745',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   },
//   deleteButton: {
//     padding: '0.5rem',
//     fontSize: '0.9rem',
//     backgroundColor: '#dc3545',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default PostList;




import React from 'react';

const PostList = ({ posts, onDelete, onUpdate }) => {
  // Sort posts by date (most recent first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Group posts by tags
  const postsByTags = sortedPosts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(post);
    });
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      {Object.entries(postsByTags).map(([tag, posts]) => (
        <div key={tag} style={styles.tagSection}>
          <h2 style={styles.tagHeading}>#{tag}</h2>
          {posts.map((post) => (
            <div key={post._id} style={styles.postContainer}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postContent}>{post.content}</p>
              <p style={styles.postDate}>
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {/* Update and Delete buttons */}
              <div style={styles.buttonContainer}>
                <button
                  style={styles.updateButton}
                  onClick={() => onUpdate(post._id)}
                >
                  Update
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => onDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
  },
  tagSection: {
    marginBottom: '2rem',
  },
  tagHeading: {
    color: '#007bff',
    borderBottom: '2px solid #007bff',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  postTitle: {
    color: '#333',
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
  },
  postContent: {
    color: '#555',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  postDate: {
    color: '#777',
    fontSize: '0.9rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  updateButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PostList;