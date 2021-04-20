const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');
const commentController = require('../controllers/CommentController');

router.post('/', auth, catchAsync(commentController.createComment));

router.put(
  '/:comment_id',
  auth,
  owner.commentOwner,
  catchAsync(commentController.editComment),
);

router.delete(
  '/:comment_id',
  auth,
  owner.commentOwner,
  catchAsync(commentController.deleteComment),
);

module.exports = router;
