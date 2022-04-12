const { authJWT } = require("../middlewares/index.js");
const { Router } = require("express");
const productsController = require("../controllers/products.controller.js");

const router = Router();

router.get("/", productsController.getProducts);

router.get("/:productId", productsController.getProductById);

router.post("/", [ authJWT.verifyToken, authJWT.isModerator ], productsController.createProduct);

router.put("/:productId", [authJWT.verifyToken, authJWT.isAdmin], productsController.updateProductById);

router.delete("/:productId", [authJWT.verifyToken, authJWT.isAdmin], productsController.deleteProductById);


module.exports = router;
