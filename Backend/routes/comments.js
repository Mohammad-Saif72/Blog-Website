const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

// Add Comment
router.post('/', auth, async (req, res) => {
  const { content, postId } = req.body;
  const comment = new Comment({ content, post: postId, author: req.user.id });
  await comment.save();
  res.status(201).json(comment);
});

// Get Comments for a Post
router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
  res.json(comments);
});

module.exports = router;