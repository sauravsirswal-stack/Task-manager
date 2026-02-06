const express = require('express');
const router = express.Router();

const userRoutes = require("./user-routes")
const projectRoutes = require("./project-routes")

router.use("/user", userRoutes)
router.use("/projects", projectRoutes)

module.exports = router