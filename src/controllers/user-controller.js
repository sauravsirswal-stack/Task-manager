const { StatusCodes } = require("http-status-codes")
const { UserService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")

async function signUp(req, res) {
    try {
        const user = await UserService.createUser({
            email: req.body.email,
            password: req.body.password
        })
        console.log("user", user)
        SuccessResponse.data = user
        SuccessResponse.message = "User created successfully"
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function signIn(req, res) {
    try {
        const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        })
        SuccessResponse.data = user
        SuccessResponse.message = "User signed in successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    signUp,
    signIn
}