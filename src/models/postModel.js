import { Model, DataTypes } from "sequelize";

import { sequelize } from './../config/db.js';

class Post extends Model{}

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,   
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mediaUrl: {
        type: DataTypes.STRING,
    },
    visibility: {
        type: DataTypes.ENUM('public', 'private', 'followers'),
        defaultValue: 'public',
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
});

export default Post;