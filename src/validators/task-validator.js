const Joi = require("joi");
const { Enums } = require("../utils/common");
const { LOW, MEDIUM, HIGH } = Enums.PriorityEnums;
const { PENDING, IN_PROGRESS, COMPLETED } = Enums.StatusEnums;

const objectId = Joi.string().hex().length(24);


const createTaskSchema = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().allow("", null),
    assignedTo: Joi.array().items(objectId).default([]),
    status: Joi.string().valid(PENDING, IN_PROGRESS, COMPLETED).default(PENDING),
    dueDate: Joi.date().iso(),
    priority: Joi.string().valid(LOW, MEDIUM, HIGH).default(MEDIUM)
});


const updateTaskSchema = Joi.object({
    title: Joi.string().min(2).max(200),
    description: Joi.string().allow("", null),
    status: Joi.string().valid(PENDING, IN_PROGRESS, COMPLETED),
    dueDate: Joi.date().iso(),
    priority: Joi.string().valid(LOW, MEDIUM, HIGH)
});


const assignTaskSchema = Joi.object({
    userId: objectId.required()
});


const unassignTaskSchema = Joi.object({
    userId: objectId.required()
});

const validateTaskParams = Joi.object({
    taskId: objectId.required()
})


module.exports = {
    createTaskSchema,
    updateTaskSchema,
    assignTaskSchema,
    unassignTaskSchema,
    validateTaskParams
};
