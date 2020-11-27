/* Modules */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require("morgan")

const db = require("./config/db")
const {books, rents, login, users} = require('./routes')

/* Configurations */
const app = express()
const port = 3001

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    // console.log("DB Conected...")
    /* para testes */
    mongoose.connection.db.dropDatabase();
}).catch(() => {
    console.log("Connection Error...")
})

/* Routes */
app.get('/', (req, res)=>{
    res.send('Api de Livraria')
})
app.use('/books', books)
app.use('/rents', rents)
app.use('/login', login)
app.use('/users', users)

/* Server */
app.listen(port, () => { console.log(`Server in http://localhost:${port}`) })

module.exports = app
