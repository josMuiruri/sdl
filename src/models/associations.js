import User from './userModel.js';
import Post from './postModel.js';

// relationships
export const setupAssociations = () => {
    User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
    Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
};
