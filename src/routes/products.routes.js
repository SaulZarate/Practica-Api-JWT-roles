const {Router} = require("express");

const router = Router()

router.get('/products', (req, res) => {
    res.json('Get products')
})


module.exports = router