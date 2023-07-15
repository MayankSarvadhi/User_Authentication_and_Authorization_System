const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");

const AuthSchema = sequelize.define("UserToken", {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Token Must be Unique"
        }
    },
       userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "userDetails",
            key: "id"
        }
    }
});

module.exports = AuthSchema;