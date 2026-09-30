import { Model, DataTypes} from "sequelize";

import { sequelize } from "./../config/db.js"
// import { validator } from "sequelize/lib/utils/validator-extras";
class User extends Model{}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.CITEXT,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email',
            },
        },
        set(value) {
            if (value) {
                this.setDataValue('email', value.toLowerCase().trim());
            } else {
                this.setDataValue('email', null);
            }
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 8,
                msg: 'Please provide a password with aleast 8 characters'
            }
        }
    },
    // passwordConfirm: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         matchesPassword(value) {
    //             if (value !== this.password) {
    //                 throw new Error('Please confirm your password, passwords do not match')
    //             }
    //         }
    //     }
    // }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;