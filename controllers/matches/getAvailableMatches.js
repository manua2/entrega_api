const matchModel = require('../../models/match')

module.exports = (request, response) => {
    matchModel.find({finishedMatch: "false", $or: [{player: request.body.user}, {opponent: request.body.user}]}, (error, matches) => {
        if (error) {
            response.status(500).json({
                message: 'No se pudieron obtener las partidas disponibles'
            })
        } else {
            response.json({
                matches
            })
        }
    })
}