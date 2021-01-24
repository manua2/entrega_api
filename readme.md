# Entrega final API

## Variables de entorno
Crear archivo `.env` con variables de entorno (ejemplo debajo)
```
PORT=3000

DB_HOST=localhost
DB_PORT=27017
DB_NAME=someDatabaseName

JWT_KEY=super_secret_key
```

## Primeros pasos
```bash
# Instalar nodemon de forma global
npm install -g nodemon

# Instalar dependencias
npm install

# Generar e insertar datos en MongoDB
npm run seed

# Ejecutar API
npm run dev
```

## Testing
```bash
# Para correr tests unitarios ejecutar el siguiente comando
npm run test
```


ver si se puede salvar la partida con cosas extra como quien gano o agregar finishedMatch a models etc
