const mongoose = require('mongoose');
require("../models/User")
const User = mongoose.model("users");

const jwt = require('jsonwebtoken');
const JWT_PASSWORD = 'manuelsimosa';

const handlers = (() => ({
    admin: (req, res, next) => {
        const token = req.header('token') 
        const userId = req.header('user_id') 

        User.findById(userId, (err, user) => {
            if (err) return res.status(500).send(err) 
            if (!user) return res.status(403).send({ message: 'Usuario Administrador inexistente!' })
            if (user.type < 1) return res.status(403).send({ message: 'Usuario sem nivel de acceso!' })
            if (user.token != token) return res.status(403).send({ message: 'Token inválido!' })
            jwt.verify(token, JWT_PASSWORD, function (err, decoded) {
                if (err) return res.status(500).send(err)
                next()
            });
        })
    },
    noAdmin: (req, res, next) => {
        const token = req.header('token')
        const userId = req.header('user_id')

        User.findById(userId, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(403).send({ message: 'Usuario inexistente!' })
            if (user.token != token) return res.status(403).send({ message: 'Sem permissão!' })
            jwt.verify(token, JWT_PASSWORD, function (err, decoded) {
                if (err) return res.status(500).send(err)
                next()
            });
        })
    }
}))

module.exports = handlers