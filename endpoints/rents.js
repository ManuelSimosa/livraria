const mongoose = require('mongoose');
require("../models/Rent")
const Rent = mongoose.model("rents");
require("../models/Book")
const Book = mongoose.model("books");

const handlers = ({ axios }) => ({
  list: (req, res) => {
    Rent.find((err, data) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(data);
    });
  },
  rent: (req, res) => {
    const renterId = req.body.renterId
    Book.findById(req.params.id, (err, book) => {
      if (err) return res.status(500).send(err)
      if (!book) return res.status(403).send({message: 'Livro inexistente!'})
      if (book.stock == 0) return res.status(500).send({ message: 'Livro indisponível não está em stock' })
      const today = new Date()
      const validate = new Date(today.getTime() + (1000 * 60 * 60 * 24 * 7 * 2))
      const rent = {
        rentalDate: today,
        returnDate: validate,
        bookId: req.params.id,
        renterId: renterId
      }
      Rent.exists({ renterId: renterId, bookId: req.params.id }, (err, yes) => {
        if (yes) return res.status(200).send({ message: 'O usuario ja tem uma versão de este livro' })
        Rent.create(rent, (err, rent) => {
          if (err) return res.status(500).send(err);
          Book.findByIdAndUpdate(req.params.id, { stock: book.stock - 1 }, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(rent);
          })
        })
      })
    })
  },
  return: (req, res) => {
    const renterId = req.body.renterId
    Book.findById(req.params.id, (err, book) => {
      if (err) return res.status(500).send(err)
      if (!book) return res.status(400).send({ message: "Livro inexsistente!" })
      Rent.findOneAndDelete({ renterId: renterId, bookId: req.params.id }, (err, rent) => {
        if (err) return res.status(500).send(err)
        if (!rent) return res.status(400).send({ message: "O usuario não tinha este livro!" })
        Book.findByIdAndUpdate(req.params.id, { stock: book.stock + 1 }, (err, data) => {
          if (err) return res.status(500).send(err);
          return res.status(200).send(rent);
        })
      })
    })
  },
});

module.exports = handlers;

