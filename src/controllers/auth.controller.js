const JWT = require('jsonwebtoken')
const { config } = require("../config/config.js");
const { Role } = require('../models/Role.js');
const User = require("../models/User.js");

const register = async(req, res) => {
    const { username, email, password, roles } = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encriptPassword(password),
    })

    // Checking for roles
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name: "user"})
        newUser.roles = [ role._id ]
    }

    // Saving the user
    const savedUser = await newUser.save()

    // Create Token JWT
    const token = JWT.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 86400 segundos = 24 horas
    })
    
    res.status(200).json({user: newUser, token})
}

const login = async(req, res) => {
    const { email, password } = req.body

    // Validate email
    // populate => relaciona tablas
    const userFound = await User.findOne({email}).populate("roles")
    if(!userFound) res.status(400).json({message: "User not found"})
    
    // Validate password
    const matchPassword = await User.comparePassword(password, userFound.password)
    if(!matchPassword) res.status(400).json({token: null, message: "Invalid password"})

    // Create token JWT
    const token = JWT.sign({id: userFound._id}, config.SECRET, {
        expiresIn: "24h" // 24horas
    })

    // Response
    res.json({token})
}


const authController = { register, login }
module.exports = authController