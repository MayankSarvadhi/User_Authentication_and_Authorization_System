const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

module.exports = db = { sequelize, Sequelize }

db.UserModel = require("./User.Model");
db.AuthModel = require("./Auth.Model");

// db.sequelize.sync({ force: false });
