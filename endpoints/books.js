const mongoose = require('mongoose');
require("../models/Book")
const Book = mongoose.model("books");

const handlers = ({ axios }) => ({
  get: (req, res) => {
    Book.find(req.body, (err, books) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(books);
    });
  },
  create: (req, res) => {
    Book.create(req.body, (err, book) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(book);
    })
  },
  update: (req, res) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) { return res.status(500).send(err) }
      if (!book) return res.status(200).send({messaage: 'livro inexistente!'}) 
      if (book.stock < 1) return res.status(200).send({ message: 'Atualização indisponível por falta de livro em stock' })
      Book.findByIdAndUpdate(book._id, req.body, (err, book) => {
         if (err) return res.status(500).send(err);
        return res.status(200).send({book});
      })
    })
  },
  getOne: (req, res) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) return res.status(500).send(err)
      if (!book) return res.status(500).send({messaage: 'livro inexsistente!'})
      return res.status(200).send(book);
    })
  },
  delete: (req, res) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) return res.status(500).send(err)
      if (!book) return res.status(200).send({message: 'livro inexistente'})
      if (book.stock == 0) return res.status(200).send({ message: 'Delete indisponível por falta de livro em stock' })
      Book.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.sendStatus(200);
      })
    })
  },
});

module.exports = handlers;
