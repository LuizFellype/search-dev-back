const mongoose = require('mongoose')

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

const DevSchema = new mongoose.Schema({
    github_username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    bio: String,
    techs: [String],
    avatar_url: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})


module.exports = mongoose.model('Dev', DevSchema)