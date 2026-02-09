const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validate(schema, property = "body") {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        if (error) {
            ErrorResponse.error = error.details[0].message;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        req[property] = value;
        next();
    };
}

module.exports = validate;
