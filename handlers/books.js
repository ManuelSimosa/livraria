const mongoose = require('mongoose');
require("../models/Book")
const Book = mongoose.model("books");

const handlers = ({ axios }) => ({
  get: (req, res) => {
    Book.find((err, people) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(people);
    });
  },
  create: (req, res) => {
    Book.create(req.body, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(200);
    })
  },
  update: (req, res) => {
    Book.findById(req.params.id, (err, data) => {
      if (err) { return res.status(500).send(err) }
      else {
        if (data.stock == 0) {
          return res.status(500).send({ message: 'Atualização indisponível por falta de livro em stock' })
        } else {
          Book.findByIdAndUpdate(data._id, req.body, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.sendStatus(200);
          })
        }
      }
    })
  },
  getOne: (req, res) => {
    Book.findById(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(data);
    })
  },
  delete: (req, res) => {
    Book.findById(req.params.id, (err, data) => {
      if (err) { return res.status(500).send(err) }
      else {
        if (data.stock == 0) {
          return res.status(500).send({ message: 'Delete indisponível por falta de livro em stock' })
        } else {
          Book.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.sendStatus(200);
          })
        }
      }
    })
  },
});

module.exports = handlers;
