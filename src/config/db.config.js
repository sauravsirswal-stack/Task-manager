const mongoose = require('mongoose')
const AppError = require("../utils/errors/app-error")
const { StatusCodes } = require("http-status-codes")
const { DB_URL } = require("../config/server.config")

async function connectToDB() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to the database successfully");
    } catch (error) {
        throw new AppError("Database connection error", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = connectToDB