const { StatusCodes } = require("http-status-codes")
const { Auth } = require("../utils/common")
const { ErrorResponse } = require("../utils/common")
const { JWT_SECRET } = require("../config/server.config")
const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    try {
        let authorization = req.headers.authorization
        if(!authorization) {
            ErrorResponse.error = "No token provided";
            return res.status(StatusCodes.FORBIDDEN).json(ErrorResponse);
        }
        let token = authorization.split(" ")[1]
        const response = jwt.verify(token, JWT_SECRET)
        if(!response) {
            ErrorResponse.error = "Token not verified";
            return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }
        req.user = response.id;
        next();
    } catch (error) {
        if(error.name == "JsonWebTokenError") {
            ErrorResponse.error = error.message;
            return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    isAuthenticated
}