const UserRouter = require("express").Router();
const asyncWrapper = require("../middleware/asyncWrapper");
const passport = require("passport");

const { userController } = require("../controller");

UserRouter.post("/", asyncWrapper(userController.RegisterUser));
UserRouter.get("/", passport.authenticate('jwt', { session: false }), asyncWrapper(userController.verifyRoutes));
UserRouter.delete("/:id", passport.authenticate('jwt', { session: false }), asyncWrapper(userController.DeleteUser));
UserRouter.put("/:id", passport.authenticate('jwt', { session: false }), asyncWrapper(userController.updateUser));

module.exports = UserRouter;