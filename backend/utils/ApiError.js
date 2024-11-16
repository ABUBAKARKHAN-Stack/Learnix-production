class ApiError extends Error {

    constructor(status,
        error = [],
        message = "Something went wrong",
        stack = ""
    ) {
        super();
        this.status = status;
        this.error = error;
        this.message = message;
        this.stack = stack || Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError