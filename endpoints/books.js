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
  getOne: (req, res) => {
    Book.findById(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(data);
    })
  },
  rent: (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(data);
    })
  },
  create: (req, res) => {
    Book.create(req.body, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(data);
    })
  },
  delete: (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(data);
    })
  },
});

module.exports = handlers;
