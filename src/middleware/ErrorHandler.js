const ErrorType = require("../utils/ErrorType");

function customError(err, statusCode, res) {
    const errObj = { statusCode: statusCode, message: err.message }
    return res.status(statusCode).send(errObj);
}

const ErrorHandler = (err, req, res, next) => {

    switch (err.reason || err.errors[0].type) {
        case ErrorType.invalid_request:
            return customError(err, 400, res);

        case ErrorType.validation_error:
            return customError(err, 400, res);

        case ErrorType.not_found:
            return customError(err, 404, res);

        case ErrorType.Forbidden:
            return customError(err, 403, res);

        case ErrorType.unauthorized:
            return customError(err, 401, res);

        case ErrorType.unique_violation:
            return customError(err, 409, res);

        case ErrorType.conflict:
            return customError(err, 409, res);

        case ErrorType.Validation_error:
            return customError(err, 400, res);

        default:
            return customError(err, 500, res);
    }
};

module.exports = ErrorHandler;

