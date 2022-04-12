const { default: mongoose, Schema, model } = require("mongoose");

const ROLES = ["user","moderator","admin"]

const roleSchema = new Schema({
    name: String,

}, {
    versionKey: false
})

const Role = model('Role', roleSchema)


module.exports = {Role, ROLES}