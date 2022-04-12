const { ROLES } = require("../models/Role.js")
const User = require("../models/User.js")

const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    
    // Validate userName
    const user = await User.findOne({username: req.body.username})
    if(user) return res.status(400). json({message: "The username already exists"})
    console.log(user)
    
    // Validate email
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400). json({message: "The email already exists"})

    // Next middleware
    next()
}

const checkRolesExisted = (req, res, next) => {
    const roles = req.body.roles
    if(roles){
        for (const rol of roles) {
            if(!ROLES.includes(rol)){
                res.status(400).json({
                    message: `Role ${rol} does not  exists`
                })
            }
        }
    }

    next()
}


module.exports.checkRolesExisted = checkRolesExisted
module.exports.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail