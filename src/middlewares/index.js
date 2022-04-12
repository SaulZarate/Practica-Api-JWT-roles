const { verifyToken, isModerator, isAdmin } = require("./authJwt")
const { checkRolesExisted, checkDuplicateUserNameOrEmail } = require("./verifyRegister.js")


module.exports.authJWT = {
    verifyToken,
    isModerator,
    isAdmin
}

module.exports.verifyRegister = {
    checkRolesExisted,
    checkDuplicateUserNameOrEmail
}