import User from './userModel.js';
import Post from './postModel.js';
import Comment from './commentModel.js';

// relationships
export const setupAssociations = () => {
    // User -> Post
    User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
    Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

    // user -> Comment
    User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
    Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

    // Post -> comment
    Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
    Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

    // Self-reference (Comment Replies)
    Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parent' });
    Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies' });
};
