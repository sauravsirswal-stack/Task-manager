const Joi = require("joi");

const { Enums } = require("../utils/common");
const { PENDING, IN_PROGRESS, COMPLETED } = Enums.StatusEnums;
const { LOW, MEDIUM, HIGH } = Enums.PriorityEnums;

const objectId = Joi.string().hex().length(24);

const taskQuerySchema = Joi.object({
    page: Joi.number().min(1).default(1),
    status: Joi.string().valid(PENDING, IN_PROGRESS, COMPLETED),
    priority: Joi.string().valid(LOW, MEDIUM, HIGH),
    assignedTo: objectId,
    assignedAt: Joi.date().iso(),
    taskId: objectId,
    completedAt: Joi.date().iso(),
    dueDate: Joi.date().iso(),
    createdBy: objectId,
    limit: Joi.number().min(1).default(10),
});

module.exports = {
    taskQuerySchema
};
