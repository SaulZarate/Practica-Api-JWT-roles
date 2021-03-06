// Model
const Product = require("../models/Products.js")

/* 
    Controllers 
*/
const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body

    const product = new Product({name, category, price, imgURL})
    const productSaved = await product.save()

    res.status(201).json(productSaved)
}

const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true // Devuelve el objeto actualizado
    })
    res.status(200).json(updatedProduct)
}

const deleteProductById = async (req, res) => {
    const { productId } = req.params
    const deletedProduct = await Product.findByIdAndDelete(productId)
    res.status(204).json()
}


const productsController = { createProduct, getProducts, getProductById, updateProductById, deleteProductById }
module.exports = productsController