const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rentSchema = new Schema({
    rentalDate: { type: Number, required: true },
    returnDate: { type: Number, required: true },
    renterId: { type: String, required: true },
    bookId: { type: String, required: true },
})

mongoose.model("rents", rentSchema)