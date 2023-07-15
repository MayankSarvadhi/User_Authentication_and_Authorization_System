require("dotenv").config();
const db = require("../models/index.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = db.UserModel;
const AuthModel = db.AuthModel;
const AppError = require("../utils/AppErrorHandler");

const login = async (req, res, next) => {
    const { body: { Email, Password } } = req;

    const result = await UserModel.findOne({ where: { Email } });

    if (result && bcrypt.compareSync(Password, result.Password)) {
        const payload = {
            id: result.id,
            Email: result.Email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXP, algorithm: "HS256" }
        );

        const [rowsAffected] = await AuthModel.update(
            { token },
            { where: { userID: result.id } }
        );

        if (rowsAffected === 0) {
            await AuthModel.create({ token, userID: payload.id });
        }

        return res.status(200).json({
            success: true,
            data: token,
            message: 'Congrats! You have Successfully logged in'
        });
    } else {
        return next(new AppError("Authentication failed. Wrong Password or email",'unauthorized' ));
    }
};

const logOut = async (req, res, next) => {
    const { user: { id } } = req;

    await AuthModel.destroy({ where: { userID: id } });
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Logged out Successfully"
    });
};

module.exports = { login, logOut };
