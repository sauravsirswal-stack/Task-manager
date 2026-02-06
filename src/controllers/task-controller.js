const { StatusCodes } = require("http-status-codes")
const { TaskService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common/")

async function createTask(req, res) {
    try {
        const task = await TaskService.createTask({
            title: req.body.title,
            description: req.body.description,
            requesterId: req.user, //token
            projectId: req.params.id,
            assignedTo: req.body.assignedTo || [],
            status: req.body.status,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task created successfully"
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function deleteTask(req, res) {
    try {
        const task = await TaskService.deleteTask({
            requesterId: req.user, //token
            taskId: req.params.taskId
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task deleted successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateTask(req, res) {
    try {
        const task = await TaskService.updateTaskDetails({
            taskId: req.params.taskId,
            requesterId: req.user, //token
            data: req.body   //title,description,status,dueDate,priority
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task updated successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function assignTask(req, res) {
    try {
        const task = await TaskService.assignTask({
            requesterId: req.user, //token
            taskId: req.params.taskId,
            userId: req.body.userId
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task assigned successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function unassignTask(req, res) {
    try {
        const task = await TaskService.unassignTask({
            requesterId: req.user, //token
            taskId: req.params.taskId,
            userId: req.body.userId
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task unassigned successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAllTasks(req, res) {
    try {
        const task = await TaskService.getAllTasks({
            requesterId: req.user, //token
            query : req.query
        })
        SuccessResponse.data = task
        SuccessResponse.message = "Task fetched successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createTask,
    deleteTask,
    updateTask,
    assignTask,
    unassignTask,
    getAllTasks
}