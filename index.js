// Utilidad para leer variables de entorno (archivo .env)
require('dotenv').config()

// Dependencias externas a utilizar
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Controllers
const login = require('./controllers/users/login')
const register = require('./controllers/users/register')

// Connection string para conectarse a la base de datos
let databaseConnectionString
if (process.env.DB_USER && process.env.DB_PASSWORD) {
    databaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
} else {
    databaseConnectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

// Inicializacion de express
const app = express()

// Middleware para parseo de JSON (application/json)
app.use(bodyParser.json())

// Middleware para incrementar la seguridad por el lado de los headers de las requests
app.use(helmet())

// Middleware para comprimir las responses con gzip
app.use(compression())

// Middleware para manejo de settings CORS
app.use(cors())

// Middleware para agregar logs
app.use(morgan('dev'))

// #########################
// Definicion de rutas
// #########################

// Validacion de credenciales
app.post('/login', login)
app.post('/register', register)

mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (error) {
        console.error('No fue posible conectarse a la base de datos', error)
    } else {
        // Comenzar a escuchar por conexiones
        app.listen(process.env.PORT, () =>
            console.log(`;) Servidor corriendo en el puerto: ${process.env.PORT}`)
        )
    }
})
