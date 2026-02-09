const express = require("express")
const router = express.Router()

const {UserController} = require("../../controllers")
const { validate } = require("../../middlewares")
const { userValidator } = require("../../validators")

// api/v1/users/signup
router.post("/signup",
    validate(userValidator.userSignupSchema),
    UserController.signUp)

// api/v1/users/signin
router.post("/signin",
    validate(userValidator.userLoginSchema),
    UserController.signIn)

module.exports = router