const { model, Schema } = require('mongoose')

module.exports = model('users', new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}))