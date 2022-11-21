const express = require('express')
const { getNomors, getNomor, createNomor, deleteNomor, updateNomor } = require('../controllers/nomorController')
const router = express.Router()

// GET all nomors
router.get('/', getNomors)

// GET a single nomor
router.get('/:id', getNomor)

// POST a new nomor
router.post('/', createNomor)

// DELETE a nomor
router.delete('/:id', deleteNomor)

// UPDATE a nomor
router.patch('/:id', updateNomor)

module.exports = router