const { StatusCodes } = require("http-status-codes")
const { ProjectRepository } = require("../repository")
const AppError = require("../utils/errors/app-error")

const projectRepository = new ProjectRepository()

async function createProject({ name, description, owner }) {
    try {
        const project = await projectRepository.create({
            name: name,
            description: description,
            owner: owner
        })
        return project
    } catch (error) {
        if (error.name == "MongoServerError") {
            throw new AppError("Project already exists", StatusCodes.BAD_REQUEST)
        }
        throw error
    }
}

async function deleteProject({ projectId, owner }) {
    try {
        const project = await projectRepository.delteProjectById(projectId, owner)
        if (!project) {
            throw new AppError("Project not found or owner not authorized", StatusCodes.NOT_FOUND)
        }
        return project
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateProjectDetails({ projectId, owner, data }) {
    try {
        const project = await projectRepository.updateProjectDetails(projectId, owner, data)
        if (!project) {
            throw new AppError("Project not found or owner not authorized", StatusCodes.NOT_FOUND)
        }
        return project
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addMember({ requesterId, projectId, userId }) {
    try {
        const project = await projectRepository.findById(projectId)
        if (!project) {
            throw new AppError("Project not found", StatusCodes.NOT_FOUND)
        }
        if (project.owner != requesterId) {
            throw new AppError("You are not the owner of this project", StatusCodes.UNAUTHORIZED)
        }
        const isMember = project.members.some(member => member.toString() === userId.toString())
        if (isMember) {
            throw new AppError("User is already a member of this project", StatusCodes.BAD_REQUEST)
        }
        return await projectRepository.addMember(projectId, userId)
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function removeMember({ requesterId, projectId, userId }) {
    try {
        const project = await projectRepository.findById(projectId)
        if (!project) {
            throw new AppError("Project not found", StatusCodes.NOT_FOUND)
        }
        if (project.owner != requesterId) {
            throw new AppError("You are not the owner of this project", StatusCodes.UNAUTHORIZED)
        }
        const isMember = project.members.some(member => member.toString() === userId.toString())

        if (!isMember) {
            throw new AppError("User is not a member of this project", StatusCodes.BAD_REQUEST)
        }

        return await projectRepository.removeMember(projectId, userId)
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProjectWithMembers({ projectId, requesterId }) {
    try {
        const project = await projectRepository.getProjectWithMembers(projectId, requesterId)
        if (!project) {
            throw new AppError("You are not authorized to view this project", StatusCodes.NOT_FOUND)
        }
        return project
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createProject,
    deleteProject,
    updateProjectDetails,
    addMember,
    removeMember,
    getProjectWithMembers
}