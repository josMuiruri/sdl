import Comment from '../models/commentModel.js';

export const createComment = async (req, res) => {
  try {
    console.log("current user object:", req.user);
    const { postId, parentCommentId, content} = req.body;

    // Only the fields listed in the array will be allowed into the database
    const newComment = await Comment.create({
      postId, 
      userId: req.userId, 
      parentCommentId, 
      content,

    });
    

    res.status(201).json({ 
      status: 'success', 
      data: {
        comment: newComment
      } 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'fail',
      message: err.message
    });
  }
};

export const getAllComments = async (req, res) => {
  await Comment.find
}