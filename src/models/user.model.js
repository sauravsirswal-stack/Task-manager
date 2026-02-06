const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true, versionKey: false })

userSchema.pre("save", async function () {  
    this.password = await bcrypt.hash(this.password, 10);
});


const User = mongoose.model('User', userSchema)

module.exports = User