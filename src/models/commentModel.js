import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Comment extends Model {};

Comment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    parentCommentId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true,
});

export default Comment;