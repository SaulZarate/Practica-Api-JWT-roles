const JWT = require("jsonwebtoken")
const { config } = require("../config/config.js")
const { Role } = require("../models/Role.js")
const User = require("../models/User.js")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if(!token) return res.status(403).json({message: "No token provided"})

        const decoded = JWT.verify(token, config.SECRET)
        
        // Guardo el id del usuario en la request
        req.userId = decoded.id

        const user = await User.findById(req.userId, {password: false})
        if(!user) res.status(404).json({message: "No user found"})

        // Next middleware
        next()
        
    } catch (error) {
        return res.status(500).json({message: 'Unauthorized'})
    }
}

const isModerator = async (req, res, next) => {
    // Find user
    const user = await User.findById(req.userId)
    
    // Find roles
    const roles = await Role.find({_id: {$in: user.roles}})
    
    for (const rol of roles) {
        if(rol.name === 'moderator'){
            next()
            return
        }
    }

    return res.status(403).json({message: "Require Moderator rol"})
}

const isAdmin = async (req, res, next) => {
    // Find user
    const user = await User.findById(req.userId)
        
    // Find roles
    const roles = await Role.find({_id: {$in: user.roles}})

    for (const rol of roles) {
        if(rol.name === 'admin'){
            next()
            return
        }
    }

    return res.status(403).json({message: "Require Moderator admin"})
}

module.exports.verifyToken = verifyToken
module.exports.isModerator = isModerator
module.exports.isAdmin = isAdmin