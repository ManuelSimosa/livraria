const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);
require("../models/User")
const User = mongoose.model("users");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_PASSWORD = 'manuelsimosa';
const saltRounds = 15;

const handlers = ({ axios }) => ({
  get: (req, res) => {
    User.find((err, books) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send({ books });
    });
  },
  update: (req, res) => {
    User.findOneAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({ message: 'Usuario inexsistente!' })
      return res.sendStatus(200);
    })
  },
  getById: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({ message: 'Usuario inexsistente!' })
      return res.status(200).send(user);
    })
  },
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({ message: 'Usuario inexsistente!' })
      return res.sendStatus(200);
    })
  },
  create: (req, res) => {
    var user = req.body
     const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash
    User.create(user, (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({ user });
    })
  },
  auth: (req, res) => {
    const login = req.body
    if (!login) return res.status(401).send({ message: "Usuario o senha inválidos" })
    User.findOne({ email: login.email }, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(403).send({ message: 'Usuario inexistente!' })
      const comparPassword = bcrypt.compareSync(login.password, user.password);
      if (!comparPassword) return res.status(400).send({ message: "Erro na validação da senha" })
      const token = jwt.sign({ login: login.email }, JWT_PASSWORD, { expiresIn: '3600s' });
 
      User.findByIdAndUpdate(user._id, {token:token}, (err, user) => {
        user.token = token
        if (err) return res.status(500).send(err)
        jwt.verify(token, JWT_PASSWORD, function (err, decoded) {
          if (err) return res.status(500).send(err)
          decoded.message = 'validado com successo'
          return res.status(200).send({ user: user, decoded: decoded });
        });
      })
    })
  }
});

module.exports = handlers;

