/* Modules */
const express = require('express')
// const axios = require('axios')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

const db = require("./config/db")
const {users} = require('./endpoints')
const {books} = require('./routes')

/* Configurations */
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Routes */
app.get('/', (req, res)=>{
    res.send('Api de Livraria')
})
app.use('/books', books)

// const userHandlers = users({axios})
// app.get('/', userHandlers.get)
// app.post('/', userHandlers.post)
// app.put('/:id', userHandlers.put)
// app.delete('/:id', userHandlers.delete)

/* const Schema = mongoose.Schema

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Conected...")
}).catch(() => {
    console.log("Connection Error...")
})

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true },
    type: { type: Number, default: 0 },
    password: { type: String, required: true },
    token: { type: String, required: false },
})

mongoose.model("users", UserSchema)

const newUser = mongoose.model("users")
new newUser({
    firstName: "Manuel",
    lastName: "Simosa",
    email: "simosaandroid@gmail.com",
    type: 0,
    password: "123456",
    token: 'adefseefdgtyjhkuijhdfhfhgftfg'
}).save().then(() => {
    console.log('Usuario cadastrado com sucesso!')
}).catch((erro) => {
    console.log("Houve um erro no cadastro do usuario! " + erro)
})

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    relDate: { type: Number, required: true },
    stock: { type: Number, required: true },
    genre: {type: String, required: true}
})

mongoose.model("books", bookSchema)

const newBook = mongoose.model("books")
new newBook({
    title: 'Primer libro de la selva',
    author: "Elayne Sotillo",
    relDate: 642643200,
    stock: 5, 
    genre: 'Folk'
}).save().then(() => {
    console.log('Livro cadastrado com sucesso!')
}).catch((erro) => {
    console.log("Houve um erro no cadastro do livro! " + erro)
})

const rentSchema = new Schema({
    rentalDate: { type: Number, required: true },
    returnDate: { type: Number, required: true },
    renterId: { type: String, required: true },
    bookId: { type: String, required: true },
})

mongoose.model("rents", rentSchema)

const newRent = mongoose.model("rents")
new newRent ({
    rentalDate: 1601510400,
    returnDate: 1606780800,
    renterId: '5fb683f0a267216e068b8482',
    bookId: '5fb6ba7defaf6090038e1bcc'
}).save().then(() => {
    console.log('Aluguel com successo!')
}).catch((erro) => {
    console.log("Houve um erro no aluguel do livro!" + erro)
}) */

/* Routes */
// app.use('/books', books)

/* Server */
app.listen(port, () => { console.log(`Server in http://localhost:${port}`) })

// module.exports = app
