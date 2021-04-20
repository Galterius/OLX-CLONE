import * as api from '../api/index';

export const createComment = async (listingId, comment) => {
  try {
    const { data } = await api.createComment(listingId, comment);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (commentId, comment) => {
  try {
    console.log(`commentId: ${commentId},comment:${comment} `);
    const { data } = await api.editComment(commentId, comment);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const { data } = await api.deleteComment(commentId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
