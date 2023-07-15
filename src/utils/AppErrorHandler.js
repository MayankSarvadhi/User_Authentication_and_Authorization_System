class AppError extends Error {
    constructor(message , reason){
        super(message)
        this.reason = reason;
        this.message = message;
        Error.captureStackTrace(this,this.constructor);
    }        
}
module.exports  = AppError;