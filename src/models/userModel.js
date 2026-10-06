import { Model, DataTypes} from "sequelize";
import bcrypt from 'bcrypt';
import { sequelize } from "./../config/db.js"
// import { validator } from "sequelize/lib/utils/validator-extras";
class User extends Model{
    async comparePassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

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
    // phone: {
    //     type: DataTypes.STRING(20),
    //     allowNull: true,
    //     unique: true,
    // },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 50],
                msg: 'Password must be between 8 and 50 characters'
            }
        }
    },
    passwordConfirm: {
        type: DataTypes.VIRTUAL,
        validate: {
            matchesPassword(value) {
                if (value !== this.password) {
                    throw new Error('Please confirm your password, passwords do not match');
                }
            },
        },
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,

    hooks: {
        beforeSave: async (user) => {
            if (!user.changed('password')) return;

            user.password = await bcrypt.hash(user.password, 12);
        },
    },
});

export default User;