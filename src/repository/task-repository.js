const CrudRepository = require("./crud-repository")
const { Task } = require("../models")

class TaskRepository extends CrudRepository {
    constructor() {
        super(Task)
    }
    async getTaskByOwnerId(userId) {
        const task = await Task.find({createdBy : userId})
        return task
    }

    async getTaskByProjectId(projectId) {
        const task = await Task.find({projectId : projectId})
        return task
    }
    async assign(data) {
        const task = await Task.findByIdAndUpdate(data.taskId, { $push: { assignedTo: {userId : data.userId} } }, { new: true })
        return task
    }
    async unassign(data) {
        const task = await Task.findByIdAndUpdate(data.taskId, { $pull: { assignedTo: {userId : data.userId} } }, { new: true })
        return task
    }
    async getAllTasks(filter, skip, limit) {
        const task = await Task.find(filter)
        .skip(skip)
        .limit(limit)
        .populate({
            path: "assignedTo.userId",
            select: "name email"
        })
        .populate({
            path: "createdBy",
            select: "name email"
        })
        .populate({
            path: "projectId",
            select: "name"
        })
        return task
    }
}

module.exports = TaskRepository
