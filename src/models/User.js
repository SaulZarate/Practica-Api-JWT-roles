const bcryptjs = require("bcryptjs");
const { default: mongoose, Schema, model } = require("mongoose");
const Role = require("./Role");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encriptPassword = async (password) => {
    // salt => Cantidad de "encriptaciones" que se hacen
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, newPassword) => {
    return await bcryptjs.compare(password, newPassword)
}

const User = model('User', userSchema)
module.exports = User