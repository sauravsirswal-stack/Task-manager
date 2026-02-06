const CrudRepository = require("./crud-repository")
const { Project } = require("../models")

class ProjectRepository extends CrudRepository {
    constructor() {
        super(Project)
    }

    async addMember(projectId, userId) {
        const project = await Project.findByIdAndUpdate(projectId,{
            $addToSet : {
                members : userId
            }
        }, {new : true})
        return project
    }

    async removeMember(projectId, userId) {
        const project = await Project.findByIdAndUpdate(projectId,{
            $pull : {
                members : userId
            }
        }, {new : true})
        return project
    }

    async updateProjectDetails(projectId, owner, data){
        const project = await Project.findOneAndUpdate({
            _id : projectId,
            owner : owner
        }, data, {new : true})
        return project
    }

    async getProjectWithMembers(projectId, requesterId) {
        const project = await Project.findOne({
                id : projectId,
            $or : [
                {owner : requesterId},
                {members : requesterId}
            ]
        }).populate("owner", "email createdAt updatedAt")
           .populate("members", "email createdAt updatedAt")
        return project
    }

    async delteProjectById(projectId, owner) {
        const project = await Project.findByIdAndDelete(projectId, owner)
        return project
    }
}
module.exports = ProjectRepository