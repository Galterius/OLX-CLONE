const commentService = require('../service/CommetService');

exports.createComment = async (req, res) => {
  const { listingId } = req.body;
  try {
    const listing = await commentService.createCommentServie(
      listingId,
      req.body,
    );
    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'an error has occurred' });
  }
};

exports.editComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const updated = await commentService.editCommentServie(
      comment_id,
      req.body,
    );
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'an error has occurred' });
  }
};

exports.deleteComment = async (req, res) => {
  console.log('wtyf');
  try {
    const { comment_id } = req.params;
    const deleted = await commentService.deleteCommentService(comment_id);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'an error has occurred' });
  }
};
