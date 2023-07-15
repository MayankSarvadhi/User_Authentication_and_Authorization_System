const db = require("../models/index.Model");
const UserModel = db.UserModel;
const AppError = require("../utils/AppErrorHandler");

const RegisterUser = async (req, res, next) => {
    const result = await UserModel.create(req.body);
    if (result) {
        return res.status(201).json({
            Success: true,
            StatusCode: 201,
            data: result,
            message: "User Registered Successfully"
        });
    }
};

const DeleteUser = async (req, res, next) => {
    const { params: { id } } = req;

    const rowsAffected = await UserModel.destroy({ where: { id } });
    if (rowsAffected === 0) {
        return next(new AppError(`No user found with id = ${id}`, 'not_found'));
    } else {
        return res.status(200).json({
            Success: true,
            StatusCode: 200,
            data: rowsAffected,
            message: "User Deleted Successfully"
        });
    }
};

const verifyRoutes = async (req, res, next) => {
    const data = await UserModel.findAll({});
    return res.status(200).json({
        success: true,
        data , 
        message: `Congrats! You are a verified user. Welcome to our website - ${req.user.Email}`
    });
};

const updateUser = async (req, res, next) => {
    const { params: { id } } = req;

    const [rowsAffected] = await UserModel.update(req.body, { where: { id } });
    if (rowsAffected === 0) {
        return next(new AppError(`No user found with id = ${id}`, 'not_found'));
    } else {
        return res.status(200).json({
            Success: true,
            StatusCode: 200,
            data: rowsAffected,
            message: "User Profile Updated Successfully"
        });
    }
};

module.exports = { RegisterUser, DeleteUser, updateUser, verifyRoutes };
