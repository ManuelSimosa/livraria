const mongoose = require('mongoose');
require("../models/User")
const User = mongoose.model("users");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_PASSWORD = 'manuelsimosa';
const saltRounds = 15;

const handlers = ({ axios }) => ({
  get: (req, res) => {
    User.find((err, people) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(people);
    });
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({message: 'Usuario inexsistente!'}) 
      return res.sendStatus(200);
    })
  },
  getById: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({message: 'Usuario inexsistente!'})
      return res.status(200).send(user);
    })
  },
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({message: 'Usuario inexsistente!'})
      return res.sendStatus(200);
    })
  },
  create: (req, res) => {
    var user = req.body 
    const token = jwt.sign({ login: user.email }, JWT_PASSWORD, { expiresIn: '3600s' });
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.token = token
    user.password = hash
    User.create(user, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({data});
    })
  },
  auth: (req, res) => {
    const login = req.body
    if (!login) return res.status(401).send({ message: "Usuario o senha inválidos" })
    User.findOne({ email: login.email }, (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(500).send({message: 'Usuario inexsistente!'})
      const comparPassword = bcrypt.compareSync(login.password, user.password);
      if (!comparPassword) return res.status(401).send({ message: "Erro na validação da senha" })
      const token = jwt.sign({ login: login.email }, JWT_PASSWORD, { expiresIn: '3600s' });
      User.findByIdAndUpdate(user._id, { token: token }, (err, editUser) => {
        if (err) return res.status(500).send(err)
        jwt.verify(token, JWT_PASSWORD, function (err, decoded) {
          if (err) return res.status(500).send(err)
          editUser.token = token
          decoded.message = 'validado com successo'
          return res.status(200).send({user: editUser, decoded: decoded});
        });
      })
    })
  }
});

module.exports = handlers;

