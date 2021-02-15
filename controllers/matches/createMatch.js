const Joi = require("@hapi/joi");
const matchModel = require("../../models/match");
const userModel = require("../../models/user");

module.exports = async (request, response) => {
    const schema = Joi.object({
        player: Joi.string().required().email(),
        opponent: Joi.string().required().email(),
        finishedMatch: Joi.string().required(),
        move_1_1: Joi.string(),
        move_1_2: Joi.string(),
        move_2_1: Joi.string(),
        move_2_2: Joi.string(),
        move_3_1: Joi.string(),
        move_3_2: Joi.string(),
        winner: Joi.string(),
    });

    const opponentFixed = request.body.opponent.toLowerCase();

    const validationResult = schema.validate(request.body);

    var emailCheck;
    await userModel.find({ email: opponentFixed }, (error, user) => {
        if (user[0] === undefined) {
            emailCheck = false;
        } else if (user) {
            emailCheck = true;
        }
    });

    var matchAlreadyExists;
    await matchModel.find(
        {
            $and: [
                {
                    $and: [
                        { player: request.body.player },
                        { opponent: opponentFixed },
                    ],
                },
                { finishedMatch: "false" },
            ],
        },
        (error, match) => {
            if (match[0] !== undefined) {
                matchAlreadyExists = true;
            } else {
                matchAlreadyExists = false;
            }
        }
    );

    var bad;
    if (request.body.player === opponentFixed) {
        bad = true;
    } else {
        bad = false;
    }

    if (
        !validationResult.error &&
        emailCheck == true &&
        bad == false &&
        matchAlreadyExists == false
    ) {
        matchModel.create(
            {
                player: request.body.player,
                opponent: opponentFixed,
                finishedMatch: request.body.finishedMatch,
                move_1_1: request.body.move_1_1,
                move_1_2: request.body.move_1_2,
                move_2_1: request.body.move_2_1,
                move_2_2: request.body.move_2_2,
                move_3_1: request.body.move_3_1,
                move_3_2: request.body.move_3_2,
                winner: request.body.winner,
            },
            (error, match) => {
                if (error) {
                    response.status(500).json({
                        message: "No se pudo crear la partida",
                    });
                } else {
                    response.json({
                        match,
                    });
                }
            }
        );
    } else if (bad === true) {
        response.status(403).json({});
    } else if (matchAlreadyExists == true) {
        response.status(406).json({});
    } else {
        response.status(400).json({
            message: validationResult.error,
        });
    }
};
