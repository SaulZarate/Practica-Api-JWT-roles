
const createUser = (req, res) => {
    res.json({message: 'creating user'})
}

const userController = { createUser }

module.exports = userController