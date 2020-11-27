const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    type: { type: Number, default: 0 },
    password: { type: String, required: true },
    token: { type: String, required: false },
})

mongoose.model("users", UserSchema)
