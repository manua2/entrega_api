const { model, Schema } = require('mongoose')

module.exports = model('matches', new Schema({
    player: {
        type: String,
        require: true
    },
    opponent: {
        type: String,
        require: true
    },
    finishedMatch: {
        type: String,
        require: true
    }
}))