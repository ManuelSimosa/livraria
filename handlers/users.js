const mongoose = require('mongoose');
require("../models/User")
const User = mongoose.model("users");

const handlers = ({ axios }) => ({
  get: (req, res) => {
    User.find((err, people) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(people);
    });
  },
  create: (req, res) => {
    User.create(req.body, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({id: data._id});
    })
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err,user)=>{
      if (err) return res.status(500).send(err)
      return res.sendStatus(200);
    })
  },
  getOne: (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(data);
    })
  },
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err)
      return res.sendStatus(200);
    })
  },
});

module.exports = handlers;
