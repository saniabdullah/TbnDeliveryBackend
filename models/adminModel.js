const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

// static signup method
adminSchema.statics.signup = async function(username, password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({ username, password: hash })

    return admin
}

// static login method
adminSchema.statics.login = async function(username, password) {
    
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const admin = await this.findOne({ username })

    if (!admin) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return admin
}

module.exports = mongoose.model('Admin', adminSchema)