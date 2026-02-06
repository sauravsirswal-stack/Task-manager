const { StatusCodes } = require("http-status-codes")
const { ProjectService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common/")

async function createProject(req, res) {
    try {
        const project = await ProjectService.createProject({
            name: req.body.name,
            description: req.body.description,
            owner: req.user  //id of owner
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Project created successfully"
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function deleteProject(req, res) {
    try {
        const project = await ProjectService.deleteProject({
            projectId: req.params.id,
            owner: req.user
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Project deleted successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateProject(req, res) {
    try {
        const project = await ProjectService.updateProjectDetails({
            projectId: req.params.id,
            owner: req.user, //token
            data: req.body
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Project updated successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function addMember(req, res) {
    try {
        const project = await ProjectService.addMember({
            requesterId: req.user, //token
            projectId: req.params.id,
            userId: req.body.userId
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Member added successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function removeMember(req, res) {
    try {
        const project = await ProjectService.removeMember({
            requesterId: req.user, //token
            projectId: req.params.id,
            userId: req.body.userId
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Member removed successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getProjectWithMembers(req, res) {
    try {
        const project = await ProjectService.getProjectWithMembers({
            requesterId: req.user, //token
            projectId: req.params.id
        })
        SuccessResponse.data = project
        SuccessResponse.message = "Project fetched successfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createProject,
    deleteProject,
    updateProject,
    addMember,
    removeMember,
    getProjectWithMembers
}