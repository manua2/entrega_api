const matchModel = require('../../models/match')

module.exports = (request, response) => {
    matchModel.findOneAndUpdate({_id: request.body.match_id}, {finishedMatch: 'false'}, (error, match) => {
        console.log('request', request.body)
        if (error) {
            response.status(500).json({
                message: 'No se pudo obtener la partida'
            })
        } else {
            response.json({
                match
            })
        }
    })
}