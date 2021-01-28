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
    },
    move_1_1: {
        type: String,
        require: false,
    },
    move_1_2: {
        type: String,
        require: false,
    },
    move_2_1: {
        type: String,
        require: false,
    },
    move_2_2: {
        type: String,
        require: false,
    },
    move_3_1: {
        type: String,
        require: false,
    },
    move_3_2: {
        type: String,
        require: false,
    },
}))