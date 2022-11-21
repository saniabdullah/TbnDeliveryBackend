const Product = require('../models/productModel')
const mongoose = require('mongoose')


// GET all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// GET a single product
const getProduct = async (req, res) => {
    const { id } = req.params
    console.log(id)

    const product = await Product.find({noResi: id})

    if (product.length == 0) {
        res.status(404).json({error : 'Barang anda belum sampai'})
    }

    if (!product) {
        return res.status(404).json({ error: 'No such product' })
    }

    res.status(200).json(product)
}

// POST a new product
const createProduct = async (req, res) => {
    const { noResi, name, alamatBarang } = req.body

    try {
        const product = await Product.create({ noResi, name, alamatBarang })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a product
const deleteProduct =  async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        return res.status(400).json({ error: 'No such product' })
    }

    res.status(200).json(product)
}

// UPDATE a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if (!product) {
        return res.status(400).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts, getProduct, deleteProduct, updateProduct, createProduct
}