const Joi = require("@hapi/joi");
const matchModel = require("../../models/match");
const userModel = require('../../models/user')

module.exports = async (request, response) => {
    const schema = Joi.object({
        player: Joi.string().required().email(),

        opponent: Joi.string().required(),
    });

    const validationResult = schema.validate(request.body);

    var emailCheck;
    await userModel.find({ 'email': request.body.opponent}, (error, user) => {
        if (user[0] === undefined) {
            emailCheck = false
        } else if (user) {
            emailCheck = true
        }
    })

    if (!validationResult.error && emailCheck == true) {
        matchModel.create(
            {
                player: request.body.player,
                opponent: request.body.opponent,
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
    } else {
        response.status(400).json({
            message: validationResult.error,
        });
    }
};
