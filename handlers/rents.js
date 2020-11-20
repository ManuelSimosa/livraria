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
    Book.findById(req.params.id, (err, livro) => {
      if (err) return res.status(500).send(err)
      if (livro.stock == 0) {
        return res.status(500).send({ message: 'Livro indisponível' })
      } else {
        const today = new Date()
        const validate = new Date(today.getTime() + (1000 * 60 * 60 * 24 * 7 * 2))
        const rent = {
          rentalDate: today,
          returnDate: validate,
          bookId: req.params.id,
          renterId: req.params.userId
        }
        Rent.exists({ renterId: req.params.userId, bookId: req.params.id }, (err, yes) => {
          if (yes) return res.status(200).send({ message: 'O usuario ja tem uma versão deste livro' })
          Rent.create(rent, (err, rent) => {
            if (err) return res.status(500).send(err);
            Book.findByIdAndUpdate(req.params.id, { stock: livro.stock - 1 }, (err, data) => {
              if (err) return res.status(500).send(err);
              return res.sendStatus(200);
            })
          })
        })
      }
    })
  },
  return: (req, res) => {
    Book.findById(req.params.id, (err, livro) => {
      if (err) return res.status(500).send(err)
      Rent.findOneAndDelete({ renterId: req.params.userId, bookId: req.params.id }, { returnDate: new Date() }, (err, rent) => {
        if (err) return res.status(500).send(err)
        Book.findByIdAndUpdate(req.params.id, { stock: livro.stock + 1 }, (err, data) => {
          if (err) return res.status(500).send(err);
          return res.sendStatus(200);
        })
      })
    })
  },
  create: (req, res) => {
    Rent.create(req.body, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(200);
    })
  },
  delete: (req, res) => {
    Rent.findById(req.params.id, (err, data) => {
      if (err) { return res.status(500).send(err) }
      else {
        if (data.stock == 0) {
          return res.status(500).send({ message: 'Delete indisponível por falta de livro em stock' })
        } else {
          Rent.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.sendStatus(200);
          })
        }
      }
    })
  },
});

module.exports = handlers;

