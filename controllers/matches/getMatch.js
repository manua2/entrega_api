const matchModel = require('../../models/match')

module.exports = (request, response) => {
    matchModel.findById(request.params.id, (error, match) => {
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