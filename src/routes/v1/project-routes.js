const express = require("express")

const router = express.Router()

const { ProjectController } = require("../../controllers")
const { AuthMiddleware } = require("../../middlewares")

const { TaskController } = require("../../controllers")

// api/v1/projects/create
router.post("/create", AuthMiddleware.isAuthenticated, ProjectController.createProject)

// api/v1/projects/delete/:id
router.delete("/delete/:id", AuthMiddleware.isAuthenticated, ProjectController.deleteProject)

// api/v1/projects/update/:id
router.put("/update/:id", AuthMiddleware.isAuthenticated, ProjectController.updateProject)

// api/v1/projects/:id/addMember
router.post("/:id/addMember", AuthMiddleware.isAuthenticated, ProjectController.addMember)

// api/v1/projects/:id/removeMember
router.delete("/:id/removeMember", AuthMiddleware.isAuthenticated, ProjectController.removeMember)


// ------------TASKS-ROUTES-----------
// api/v1/projects/tasks?status=pending
router.get("/tasks", AuthMiddleware.isAuthenticated, TaskController.getAllTasks)

// api/v1/projects/:id
router.get("/:id", AuthMiddleware.isAuthenticated, ProjectController.getProjectWithMembers)

// api/v1/projects/:id/tasks
router.post("/:id/tasks", AuthMiddleware.isAuthenticated, TaskController.createTask)

// api/v1/projects/tasks/:taskId
router.delete("/tasks/:taskId", AuthMiddleware.isAuthenticated, TaskController.deleteTask)

// api/v1/projects/tasks/:taskId
router.patch("/tasks/:taskId", AuthMiddleware.isAuthenticated, TaskController.updateTask)

// api/v1/projects/tasks/:taskId/assign
router.post("/tasks/:taskId/assign", AuthMiddleware.isAuthenticated, TaskController.assignTask)

// api/v1/projects/tasks/:taskId/unassign
router.delete("/tasks/:taskId/unassign", AuthMiddleware.isAuthenticated, TaskController.unassignTask)


module.exports = router