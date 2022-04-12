const { default: mongoose } = require("mongoose");
const { Role } = require("../models/Role.js");

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if( count > 0) return

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ])

        console.log(values)
    } catch (error) {
        console.log(error)
    }
}

module.exports = createRoles