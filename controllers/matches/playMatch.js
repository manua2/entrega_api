const matchModel = require("../../models/match");

module.exports = (request, response) => {
    console.log('request', request.body)
    var change;
    if (request.body.finishedMatch !== undefined) {
        change = { finishedMatch: "true", winner: request.body.winner };
    } else {
        if (request.body.match.move_1_1 !== "Piedra" && request.body.match.move_1_1 !== "Papel" && request.body.match.move_1_1 !== "Tijera") {
            change = { move_1_1: request.body.move };
        } else if (request.body.match.move_1_2 !== "Piedra" && request.body.match.move_1_2 !== "Papel" && request.body.match.move_1_2 !== "Tijera") {
            change = { move_1_2: request.body.move };
        } else if (request.body.match.move_2_1 !== "Piedra" && request.body.match.move_2_1 !== "Papel" && request.body.match.move_2_1 !== "Tijera") {
            change = { move_2_1: request.body.move };
        } else if (request.body.match.move_2_2 !== "Piedra" && request.body.match.move_2_2 !== "Papel" && request.body.match.move_2_2 !== "Tijera") {
            change = { move_2_2: request.body.move };
        } else if (request.body.match.move_3_1 !== "Piedra" && request.body.match.move_3_1 !== "Papel" && request.body.match.move_3_1 !== "Tijera") {
            change = { move_3_1: request.body.move };
        } else if (request.body.match.move_3_2 !== "Piedra" && request.body.match.move_3_2 !== "Papel" && request.body.match.move_3_2 !== "Tijera") {
            change = { move_3_2: request.body.move };
        }
    }

    matchModel.findOneAndUpdate(
        { _id: request.body.match._id },
        change,
        { new: true, useFindAndModify: false },
        (error, match) => {
            if (error) {
                response.status(500).json({
                    message: "No se pudo obtener la partida",
                });
            } else {
                response.json({
                    match,
                });
            }
        }
    );
};
