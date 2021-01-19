// Utilidad para leer variables de entorno (archivo .env)
require('dotenv').config()

// Dependencias externas a utilizar
const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')

// Importo los modelos a utilizar
const userModel = require('./models/user')

// Connection string para conectarse a la base de datos
let databaseConnectionString
if (process.env.DB_USER && process.env.DB_PASSWORD) {
    databaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
} else {
    databaseConnectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

// Declaramos lista de documentos a insertar en las colecciones
const users = []

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

// Mostramos datos utiles en la consola
console.log('#############################')
console.log('Seed de datos')
console.log('#############################')
console.log('Se van a insertar:')
console.log(`${users.length} Usuarios`)

// Nos conectamos a la base de datos
mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (error) {
        console.error('No fue posible conectarse a la base de datos', error)
    } else {
        Promise.all([
            userModel.insertMany(users)
        ]).then(docs => {
            // Una vez que terminan de insertarse todos los documentos, cierro la conexion a mongodb
            mongoose.connection.close()
        })
    }
})
