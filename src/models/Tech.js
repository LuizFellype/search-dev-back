const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Tech', TechSchema)