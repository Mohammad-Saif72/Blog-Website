// const express = require('express');
// const Post = require('../models/Post');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Create Post
// router.post('/', auth, async (req, res) => {
//   const { title, content, tags } = req.body;
//   const post = new Post({ title, content, tags, author: req.user.id });
//   await post.save();
//   res.status(201).json(post);
// });

// // Get All Posts
// router.get('/', async (req, res) => {
//   const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
//   res.json(posts);
// });

// // Update Post
// router.put('/:id', auth, async (req, res) => {
//   const { title, content, tags } = req.body;
//   const post = await Post.findByIdAndUpdate(req.params.id, { title, content, tags }, { new: true });
//   res.json(post);
// });

// // Delete Post
// router.delete('/:id', auth, async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Post deleted successfully' });
// });

// // Like Post
// router.post('/:id/like', auth, async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   post.likes += 1;
//   await post.save();
//   res.json(post);
// });

// module.exports = router;

const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Post
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  const post = new Post({ title, content, tags, author: req.user.id });
  await post.save();
  res.status(201).json(post);
});

// Get All Posts (with optional author filter)
router.get('/', async (req, res) => {
  const { author } = req.query; // Get the author query parameter
  const filter = author ? { author } : {}; // Apply filter if author is provided
  try {
    const posts = await Post.find(filter).sort({ createdAt: -1 }).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Update Post
router.put('/:id', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, { title, content, tags }, { new: true });
  res.json(post);
});

// Delete Post
router.delete('/:id', auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted successfully' });
});

// Like Post
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

module.exports = router;