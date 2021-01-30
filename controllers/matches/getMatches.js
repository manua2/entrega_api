const matchModel = require("../../models/match");

module.exports = (request, response) => {
    matchModel.find(
        {
            finishedMatch: request.body.getMatchesReq.finishedMatch,
            $or: [
                { player: request.body.getMatchesReq.user },
                { opponent: request.body.getMatchesReq.user },
            ],
        },
        (error, matches) => {
            if (error) {
                response.status(500).json({
                    message: "No se pudieron obtener las partidas disponibles",
                });
            } else {
                response.json({
                    matches,
                });
            }
        }
    );
};
