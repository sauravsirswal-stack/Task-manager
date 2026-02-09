const Joi = require("joi");

const ObjectId = Joi.string().hex().length(24)

const createProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow("", null)
});

const addMemberSchema = Joi.object({
    userId: ObjectId.required()
});

const removeMemberSchema = Joi.object({
    userId: ObjectId.required()
});

const updateProjectSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().allow("", null)
});

const deleteProjectSchema = Joi.object({
    // projectId is in params usually
});
const validateProjectParams = Joi.object({
    id: ObjectId.required()
})

module.exports = {
    createProjectSchema,
    addMemberSchema,
    removeMemberSchema,
    updateProjectSchema,
    deleteProjectSchema,
    validateProjectParams
};
