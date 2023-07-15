const AuthRoute = require("express").Router();
const asyncWrapper = require("../middleware/asyncWrapper");

const { authController } = require("../controller");
const passport = require("passport");

AuthRoute.post("/", asyncWrapper(authController.login));
AuthRoute.get("/", passport.authenticate("jwt", { session: false }), asyncWrapper(authController.logOut));

module.exports = AuthRoute;