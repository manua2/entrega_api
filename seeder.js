// Utilidad para leer variables de entorno (archivo .env)
require('dotenv').config()

// Dependencias externas a utilizar
const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')

// Importo los modelos a utilizar
const userModel = require('./models/user')
const matchModel = require('./models/match')

// Connection string para conectarse a la base de datos
let databaseConnectionString
if (process.env.DB_USER && process.env.DB_PASSWORD) {
    databaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
} else {
    databaseConnectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

// Declaramos lista de documentos a insertar en las colecciones
const users = []
const matches = []

// Password a utilizar por todos los usuarios
const userPassword = bcrypt.hashSync('secret', 2)

// Por mas info sobre faker http://marak.github.io/faker.js/

// Generar una lista de 250 usuarios de tipo STANDARD
for (let numeroDeIteracion = 0; numeroDeIteracion < 250; numeroDeIteracion++) {
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: userPassword
    })
}

var moves = ['Piedra', 'Papel', 'Tijera']; 

for (const element of users) {
    var player = element.email

    for (let i = 0; i < 10; i++) {
        matches.push({
            player: player,
            opponent: users[Math.floor(Math.random() * users.length)].email,
            finishedMatch: "true",
            move_1_1: moves[Math.floor(Math.random() * moves.length)],
            move_1_2: moves[Math.floor(Math.random() * moves.length)],
            move_2_1: moves[Math.floor(Math.random() * moves.length)],
            move_2_2: moves[Math.floor(Math.random() * moves.length)],
            move_3_1: moves[Math.floor(Math.random() * moves.length)],
            move_3_2: moves[Math.floor(Math.random() * moves.length)],
            winner: player
        })
    }

    for (let i = 0; i < 10; i++) {
        matches.push({
            player: player,
            opponent: users[Math.floor(Math.random() * users.length)].email,
            finishedMatch: "false",
            move_1_1: " ",
            move_1_2: " ",
            move_2_1: " ",
            move_2_2: " ",
            move_3_1: " ",
            move_3_2: " ",
            winner: " "
        })
    }
}

// Mostramos datos utiles en la consola
console.log('#############################')
console.log('Seed de datos')
console.log('#############################')
console.log('Se van a insertar:')
console.log(`${users.length} Usuarios`)
console.log(`${matches.length} Partidas`)

// Nos conectamos a la base de datos
mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (error) {
        console.error('No fue posible conectarse a la base de datos', error)
    } else {
        Promise.all([
            userModel.insertMany(users),
            matchModel.insertMany(matches)
        ]).then(docs => {
            // Una vez que terminan de insertarse todos los documentos, cierro la conexion a mongodb
            mongoose.connection.close()
        })
    }
})
