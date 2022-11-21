const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    noResi: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    alamatBarang: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)