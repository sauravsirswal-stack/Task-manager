const express = require("express")

const router = express.Router()

const { ProjectController } = require("../../controllers")
const { AuthMiddleware } = require("../../middlewares")

const { TaskController } = require("../../controllers")

const { validate } = require("../../middlewares")
const { projectValidator, taskValidator, taskQueryValidator } = require("../../validators")

// api/v1/projects/create
router.post(
    "/create",
    validate(projectValidator.createProjectSchema),
    AuthMiddleware.isAuthenticated,
    ProjectController.createProject
)

// api/v1/projects/delete/:id
router.delete(
    "/delete/:id",
    validate(projectValidator.validateProjectParams, "params"),
    AuthMiddleware.isAuthenticated,
    ProjectController.deleteProject
)

// api/v1/projects/update/:id
router.put(
    "/update/:id",
    validate(projectValidator.validateProjectParams, "params"),
    validate(projectValidator.updateProjectSchema),
    AuthMiddleware.isAuthenticated,
    ProjectController.updateProject
)

// api/v1/projects/:id/addMember
router.post(
    "/:id/addMember",
    validate(projectValidator.validateProjectParams, "params"),
    validate(projectValidator.addMemberSchema),
    AuthMiddleware.isAuthenticated,
    ProjectController.addMember
)

// api/v1/projects/:id/removeMember
router.delete(
    "/:id/removeMember",
    validate(projectValidator.validateProjectParams, "params"),
    validate(projectValidator.removeMemberSchema),
    AuthMiddleware.isAuthenticated,
    ProjectController.removeMember
)


// ------------TASKS-ROUTES-----------
// api/v1/projects/tasks?status=pending
router.get(
    "/tasks",
    validate(taskQueryValidator.taskQuerySchema, "query"),
    AuthMiddleware.isAuthenticated,
    TaskController.getAllTasks
)

// api/v1/projects/:id
router.get(
    "/:id",
    validate(projectValidator.validateProjectParams, "params"),
    AuthMiddleware.isAuthenticated,
    ProjectController.getProjectWithMembers
)

// api/v1/projects/:id/tasks
router.post(
    "/:id/tasks",
    validate(projectValidator.validateProjectParams, "params"),
    validate(taskValidator.createTaskSchema),
    AuthMiddleware.isAuthenticated,
    TaskController.createTask
)

// api/v1/projects/tasks/:taskId
router.delete(
    "/tasks/:taskId",
    validate(taskValidator.validateTaskParams, "params"),
    AuthMiddleware.isAuthenticated,
    TaskController.deleteTask
)

// api/v1/projects/tasks/:taskId
router.patch(
    "/tasks/:taskId",
    validate(taskValidator.validateTaskParams, "params"),
    validate(taskValidator.updateTaskSchema),
    AuthMiddleware.isAuthenticated,
    TaskController.updateTask
)

// api/v1/projects/tasks/:taskId/assign
router.post(
    "/tasks/:taskId/assign",
    validate(taskValidator.validateTaskParams, "params"),
    validate(taskValidator.assignTaskSchema),
    AuthMiddleware.isAuthenticated,
    TaskController.assignTask
)

// api/v1/projects/tasks/:taskId/unassign
router.delete(
    "/tasks/:taskId/unassign",
    validate(taskValidator.validateTaskParams, "params"),
    validate(taskValidator.unassignTaskSchema),
    AuthMiddleware.isAuthenticated,
    TaskController.unassignTask
)


module.exports = router