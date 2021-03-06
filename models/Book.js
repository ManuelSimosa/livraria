const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    relDate: { type: Date, required: true },
    stock: { type: Number, required: true },
    genre: {type: String, required: true},
    quant: { type: Number, required: true }
})

mongoose.model("books", bookSchema)