const mongoose = require("mongoose")
const { Enums } = require("../utils/common")
const { PENDING, IN_PROGRESS, COMPLETED } = Enums.StatusEnums
const { LOW, MEDIUM, HIGH } = Enums.PriorityEnums

const assignedToSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : [PENDING, IN_PROGRESS, COMPLETED],
        default : PENDING
    },
    assignedAt : {
        type : Date,
        default : Date.now()
    },
    completedAt : {
        type : Date,
        default : null
    }
}, {_id : false})

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    assignedTo : [assignedToSchema],
    status : {
        type : String,
        enum : [PENDING, IN_PROGRESS, COMPLETED],
        default : PENDING
    },
    dueDate : {
        type : Date
    },
    priority : {
        type : String,
        enum : [LOW, MEDIUM, HIGH],
        default : MEDIUM
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("Task", taskSchema)