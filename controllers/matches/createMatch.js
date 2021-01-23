const Joi = require("@hapi/joi");
const { request, response } = require("express");
const matchModel = require("../../models/match");

module.exports = (request, response) => {
    const schema = Joi.object({
        player: Joi.string().required(),

        opponent: Joi.string().required(),
    });

    const validationResult = schema.validate(request.body)

    if (!validationResult.error) {
        matchModel.create({
            player: request.body.player,
            opponent: request.body.opponent,
        }, (error, match) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo crear la partida'
                })
            } else {
                response.json({
                    match
                })
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
};
