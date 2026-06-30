import { Model, DataTypes} from "sequelize";

import { sequelize } from "./../config/db.js"

class User extends Model{}

User.init({
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
});

export default User;