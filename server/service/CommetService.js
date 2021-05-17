const Listing = require('../models/listings');
const Comments = require('../models/comments');

exports.createCommentServie = async (id, commentData) => {
  try {
    console.log(commentData);
    const listing = await Listing.findById(id);

    const newComment = await Comments.create({ ...commentData });
    await newComment.save();

    await listing.comments.push(newComment);
    await listing.save();

    return newComment;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.editCommentServie = async (commentId, updatedComment) => {
  try {
    const updated = await Comments.findByIdAndUpdate(commentId, {
      ...updatedComment,
    });
    return updated;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.deleteCommentService = async (commentId) => {
  console.log('wtf');
  try {
    const deletedComment = await Comments.findByIdAndRemove(commentId);

    const { listingId } = deletedComment;

    let commentListing = await Listing.findById(listingId);

    commentListing.comments = commentListing.comments.filter(
      (comment) => comment != commentId,
    );

    const updatedListing = await Listing.updateOne(
      { _id: listingId },
      commentListing,
    );

    return updatedListing;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
