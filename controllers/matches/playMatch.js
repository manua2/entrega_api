const matchModel = require("../../models/match");

module.exports = (request, response) => {
    var change;
    if (request.body.match.move_1_1 !== "piedra" && request.body.match.move_1_1 !== "papel" && request.body.match.move_1_1 !== "tijera") {
        change = { move_1_1: request.body.move };
    } else if (request.body.match.move_1_2 !== "piedra" && request.body.match.move_1_2 !== "papel" && request.body.match.move_1_2 !== "tijera") {
        change = { move_1_2: request.body.move };
    } else if (request.body.match.move_2_1 !== "piedra" && request.body.match.move_2_1 !== "papel" && request.body.match.move_2_1 !== "tijera") {
        change = { move_2_1: request.body.move };
    } else if (request.body.match.move_2_2 !== "piedra" && request.body.match.move_2_2 !== "papel" && request.body.match.move_2_2 !== "tijera") {
        change = { move_2_2: request.body.move };
    } else if (request.body.match.move_3_1 !== "piedra" && request.body.match.move_3_1 !== "papel" && request.body.match.move_3_1 !== "tijera") {
        change = { move_3_1: request.body.move };
    } else if (request.body.match.move_3_2 !== "piedra" && request.body.match.move_3_2 !== "papel" && request.body.match.move_3_2 !== "tijera") {
        change = { move_3_2: request.body.move };
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
                console.log(error);
            } else {
                response.json({
                    match,
                });
            }
        }
    );
};
