const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const { verifyRegister } = require("../middlewares/index.js");

const router = Router()

router.post('/register', [
    verifyRegister.checkRolesExisted,
    verifyRegister.checkDuplicateUserNameOrEmail
],  authController.register)

router.post('/login', authController.login)


module.exports = router