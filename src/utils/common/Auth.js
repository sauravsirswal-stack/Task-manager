const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../../config/server.config")
// const { AppError } = require("../utils/common")
// const { StatusCodes } = require("http-status-codes")

function checkPassword(password, hashPassword){
    try {
        return bcrypt.compareSync(password, hashPassword)
    } catch (error) {
        throw error
    }
}   

function generateToken(user){
    try {
        const token = jwt.sign({id : user._id}, JWT_SECRET)
        return token
    } catch (error) {
        throw error
    }
}

function hashPassword(password){
    try {
        return bcrypt.hashSync(password,10)
    } catch (error) {
        throw error
    }
}
module.exports = {
    checkPassword,
    generateToken,
    hashPassword
}
