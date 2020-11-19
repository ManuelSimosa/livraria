/* Modules */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const db = require("./config/db")
const {books} = require('./routes')

require("./models/User")
const User = mongoose.model("users");

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

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Conected...")
}).catch(() => {
    console.log("Connection Error...")
})

// const newUser = mongoose.model("users")
// new newUser({
//     firstName: "Manuel",
//     lastName: "Simosa",
//     email: "simosaandroid@gmail.com",
//     type: 0,
//     password: "123456",
//     token: 'adefseefdgtyjhkuijhdfhfhgftfg'
// }).save().then(() => {
//     console.log('Usuario cadastrado com sucesso!')
// }).catch((erro) => {
//     console.log("Houve um erro no cadastro do usuario! " + erro)
// })

// const newBook = mongoose.model("books")
// new newBook({
//     title: 'Primer libro de la selva',
//     author: "Elayne Sotillo",
//     relDate: 642643200,
//     stock: 5, 
//     genre: 'Folk'
// }).save().then(() => {
//     console.log('Livro cadastrado com sucesso!')
// }).catch((erro) => {
//     console.log("Houve um erro no cadastro do livro! " + erro)
// })

// const newRent = mongoose.model("rents")
// new newRent ({
//     rentalDate: 1601510400,
//     returnDate: 1606780800,
//     renterId: '5fb683f0a267216e068b8482',
//     bookId: '5fb6ba7defaf6090038e1bcc'
// }).save().then(() => {
//     console.log('Aluguel com successo!')
// }).catch((erro) => {
//     console.log("Houve um erro no aluguel do livro!" + erro)
// })

/*  */


/* Server */
app.listen(port, () => { console.log(`Server in http://localhost:${port}`) })

// module.exports = app

