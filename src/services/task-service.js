const { StatusCodes } = require("http-status-codes")
const { TaskRepository } = require("../repository")
const { ProjectRepository } = require("../repository")

const taskRepository = new TaskRepository()
const projectRepository = new ProjectRepository()

const AppError = require("../utils/errors/app-error")

async function createTask(data) {
    try {
        console.log("data", data)

        const project = await projectRepository.findById(data.projectId)

        if (!project) {
            throw new AppError("Project not found", StatusCodes.NOT_FOUND)
        }
        if (project.owner.toString() !== data.requesterId.toString()) {
            throw new AppError("Not authorized", StatusCodes.FORBIDDEN)
        }
        if (data.assignedTo && data.assignedTo.length > 0) {

            const invalidUsers = data.assignedTo.filter(userId =>
                !project.members.some(member =>
                    member.toString() === userId.toString()
                )
            )

            if (invalidUsers.length > 0) {
                throw new AppError(
                    "Some assigned users are not project members",
                    StatusCodes.BAD_REQUEST
                )
            }
            data.assignedTo = data.assignedTo.map(id => ({
                userId: id
            }))
        }

        data.createdBy = data.requesterId

        const task = await taskRepository.create(data)

        return task

    } catch (error) {
        console.log("CREATE TASK ERROR:", error)

        if (error instanceof AppError) throw error

        if (error.code === 11000) {
            throw new AppError("Task already exists", StatusCodes.BAD_REQUEST)
        }

        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function deleteTask({ requesterId, taskId }) {
    try {
        const checkTask = await taskRepository.findById(taskId)
        if (!checkTask) {
            throw new AppError("Task not found", StatusCodes.NOT_FOUND)
        }
        if (checkTask.createdBy.toString() !== requesterId.toString()) {
            throw new AppError("You are not authorized to delete this task", StatusCodes.FORBIDDEN)
        }
        const task = await taskRepository.delete(taskId)
        return task
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateTaskDetails({ requesterId, taskId, data }) {
    try {
        const checkTask = await taskRepository.findById(taskId)
        if (!checkTask) {
            throw new AppError("Task not found", StatusCodes.NOT_FOUND)
        }
        if (checkTask.createdBy.toString() !== requesterId.toString()) {
            throw new AppError("You are not authorized to update this task", StatusCodes.FORBIDDEN)
        }
        const task = await taskRepository.update(taskId, data)
        return task
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function assignTask({ requesterId, taskId, userId }) {
    try {
        const task = await taskRepository.findById(taskId)
        if (!task) {
            throw new AppError("Task not found", StatusCodes.NOT_FOUND)
        }
        if (task.createdBy.toString() !== requesterId.toString()) {
            throw new AppError("You are not authorized to assign this task", StatusCodes.FORBIDDEN)
        }
        const alreadyAssigned = task.assignedTo.some(
            a => a.userId.toString() === userId.toString()
        )

        if (alreadyAssigned) {
            throw new AppError("User already assigned", StatusCodes.BAD_REQUEST)
        }

        const assignedTask = await taskRepository.assign({
            taskId,
            userId
        })
        return assignedTask
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function unassignTask({ requesterId, taskId, userId }) {
    try {
        const task = await taskRepository.findById(taskId)
        if (!task) {
            throw new AppError("Task not found", StatusCodes.NOT_FOUND)
        }
        if (task.createdBy.toString() !== requesterId.toString()) {
            throw new AppError("You are not authorized to unassign this task", StatusCodes.FORBIDDEN)
        }
        const alreadyAssigned = task.assignedTo.some(
            a => a.userId.toString() === userId.toString()
        )

        if (!alreadyAssigned) {
            throw new AppError("User not assigned", StatusCodes.BAD_REQUEST)
        }

        const assignedTask = await taskRepository.unassign({
            taskId,
            userId
        })
        return assignedTask
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const { Types } = require("mongoose");

async function getAllTasks({ query }) {
    const task = await taskRepository.getTaskByOwnerId(query.userId)
    if(!task){
        throw new AppError("You are not authorized to get tasks", StatusCodes.FORBIDDEN)
    }

    let customFilter = {}

    let page = Number(query.page) || 1
    let limit = 10
    let skip = (page - 1) * limit

    if (query.status) {
        customFilter.status = query.status
    }

    if (query.priority) {
        customFilter.priority = query.priority
    }

    if (query.dueDate) {
        customFilter.dueDate = new Date(query.dueDate)
    }

    if (query.taskId) {
        customFilter._id = new Types.ObjectId(query.taskId)
    }

    if (query.assignedTo) {
        customFilter["assignedTo.userId"] = new Types.ObjectId(query.assignedTo)
    }

    if (query.assignedAt) {
        customFilter["assignedTo.assignedAt"] = new Date(query.assignedAt)
    }

    if (query.createdAt) {
        customFilter.createdAt = new Date(query.createdAt)
    }

    if (query.updatedAt) {
        customFilter.updatedAt = new Date(query.updatedAt)
    }

    try {
        return await taskRepository.getAllTasks(customFilter, skip, limit)
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createTask,
    deleteTask,
    updateTaskDetails,
    assignTask,
    unassignTask,
    getAllTasks
}