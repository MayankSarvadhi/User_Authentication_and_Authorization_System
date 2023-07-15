const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const userSchema = sequelize.define("userDetails", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "This Email address already Exist"
        },
        validate: {
            isEmail: {
                msg: "Email address must be valid"
            }
        }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100]
        }
    }
}, {
    hooks: {
        afterValidate: (userSchema, options) => {
            userSchema.Password = bcrypt.hashSync(userSchema.Password, 12);
        }
    }
});

module.exports = userSchema;