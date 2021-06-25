const Product = require('../models/ProductModel')
const asyncHandler = require("express-async-handler");


// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find();
    res.json(products);
})
// @desc Fetch one product
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if (!product){
        res.status(404);
        throw new Error('Product not found')
    }
    res.json(product);
})
module.exports = {getProducts,getProductById}