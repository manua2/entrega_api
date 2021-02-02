const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const userModel = require('../../models/user')

module.exports = (request, response) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required(),

        password: Joi.string()
            .alphanum()
            .min(7)
            .max(50)
            .required(),

        email: Joi.string()
            .email()
            .required()
    })

    const validationResult = schema.validate(request.body)

    if (!validationResult.error) {
        const passwordHash = bcrypt.hashSync(request.body.password, 2)

        userModel.create({
            password: passwordHash,
            email: request.body.email.toLowerCase(),
            name: request.body.name
        }, (error, user) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo registrar el usuario'
                })
            } else {
                // TODO: Enviar email/sms para validacion de cuenta
                const userWithoutPassword = user.toObject()

                delete userWithoutPassword.password

                response.json({
                   user: userWithoutPassword
                })
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}
