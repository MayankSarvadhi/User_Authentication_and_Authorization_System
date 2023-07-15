const express = require("express");
const AppError = require("../utils/AppErrorHandler.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const router = express.Router();

router.use("/user", require("./Users.routes.js"));
router.use("/login", require("./Auth.routes.js"));

const invalidedRouter = asyncWrapper((req, res, next) => {
    return next(new AppError(`${req.url} - Bad Request`, 'invalid_request'));
});
router.all("*", invalidedRouter);

module.exports = router;