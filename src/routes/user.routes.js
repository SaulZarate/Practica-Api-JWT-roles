const {Router} = require("express");
const userController = require("../controllers/user.controller.js");
const { authJWT, verifyRegister } = require("../middlewares/index.js");

const router = Router()

router.post('/', [
    authJWT.verifyToken,
    authJWT.isAdmin,
    verifyRegister.checkRolesExisted
], userController.createUser)


module.exports = router