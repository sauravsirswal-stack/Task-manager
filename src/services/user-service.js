const { StatusCodes } = require("http-status-codes")
const { UserRepository } = require("../repository")
const userRepository = new UserRepository()
const { Auth } = require("../utils/common")
const AppError = require("../utils/errors/app-error")

async function createUser({email, password}) {
    try {
        const user = await userRepository.create({
            email,
            password
        })
        return user
    } catch (error) {
        console.log(error)
        if(error.name == "MongoServerError"){
            let explanation = error.errorResponse.errmsg
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function signIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email)
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND)
        }
        const isPasswordMatched = Auth.checkPassword(data.password, user.password)
        if (!isPasswordMatched) {
            throw new AppError("Invalid credentials", StatusCodes.BAD_REQUEST)
        }

        const jwt = Auth.generateToken(user)
        return jwt
    } catch (error) {
        console.log(error)
        if (error instanceof AppError) {
            throw error
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED)
        }
        const decoded = Auth.verifyToken(token)
        const user = await userRepository.findById(decoded.id)
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND)
        }
        return user.id
    } catch (error) {
        if (error instanceof AppError) {
            throw error
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated
}
