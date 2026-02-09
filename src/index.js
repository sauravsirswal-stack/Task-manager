const express = require("express")
const connectToDB = require("./config/db.config")
const { PORT } = require("./config/server.config")
const apiRoutes = require("./routes")

function setUpAndStartServer(){
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/api",apiRoutes)

    app.listen(PORT,async ()=>{
        console.log(`Server is running on port ${PORT}`)
        await connectToDB()
    })
}

setUpAndStartServer()
process.on("unhandledRejection",(error)=>{
    console.log("UNHANDLED REJECTION!");
    console.log(error.name, error.message);
    process.exit(1);
})

process.on("uncaughtException",(error)=>{
    console.log("UNCAUGHT EXCEPTION!");
    console.log(error.name, error.message);
    process.exit(1);
})