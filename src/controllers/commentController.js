import Comment from '../models/commentModel.js';

export const createComment = async (req, res) => {
  try {
    // Only the fields listed in the array will be allowed into the database
    const newComment = await Comment.create(req.body, {
      fields: ['postId', 'userId', 'parentCommentId', 'content']
    });

    res.status(201).json({ 
      status: 'success', 
      data: {
        comment: newComment
        } 
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};