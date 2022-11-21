const Nomor = require('../models/nomorModel')
const mongoose = require('mongoose')

// Get all nomors
const getNomors = async (req, res) => {
    const nomorsWa = await Nomor.find({}).sort({created: -1})

    res.status(200).json(nomorsWa)

}

// GET a single nomor
const getNomor = async (req, res) => {
    const { id } = req.params
    console.log(id)

    const nomorWa = await Nomor.find({nomor: id})

    if (nomorWa.length == 0) {
        res.status(404).json({error : 'Barang anda belum sampai'})
    }

    if (!nomorWa) {
        return res.status(404).json({ error: 'No such product' })
    }

    res.status(200).json(nomor)
}

// POST a new product
const createNomor = async (req, res) => {
    const { name, nomor } = req.body

    try {
        const nomorWa = await Nomor.create({ name, nomor })
        res.status(200).json(nomorWa)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a product
const deleteNomor =  async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const nomorWa = await Nomor.findOneAndDelete({ _id: id })

    if (!nomorWa) {
        return res.status(400).json({ error: 'No such product' })
    }

    res.status(200).json(nomorWa)
}

// UPDATE a product
const updateNomor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const nomorWa = await Nomor.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if (!nomorWa) {
        return res.status(400).json({error: 'No such product'})
    }

    res.status(200).json(nomorWa)
}

module.exports = {
    getNomors, getNomor, createNomor, deleteNomor, updateNomor
}