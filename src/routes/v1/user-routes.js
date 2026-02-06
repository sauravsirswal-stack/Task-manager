const express = require("express")
const router = express.Router()

const {UserController} = require("../../controllers")

// api/v1/users/signup
router.post("/signup", UserController.signUp)
// api/v1/users/signin
router.post("/signin", UserController.signIn)

module.exports = router