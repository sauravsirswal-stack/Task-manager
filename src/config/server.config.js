const dotenv = require("dotenv")
dotenv.config();

const SERVER_CONFIG = {
    PORT : process.env.PORT || 3000,
    DB_URL : process.env.DB_URL || "mongodb://localhost:27017/TaskManager",
    JWT_SECRET : process.env.JWT_SECRET || "secretKey"
}

module.exports = SERVER_CONFIG