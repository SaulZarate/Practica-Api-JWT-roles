const { default: mongoose, Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
})

const Product = model('Product', productSchema)
module.exports = Product