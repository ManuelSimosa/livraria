const express = require("express")
const router = express.Router()
const services = require("../services")
const {books} = require('../endpoints')

const booksHandlers = books(services)
router.get('/', booksHandlers.get)
router.get('/:id', booksHandlers.getOne)
router.put('/:id', booksHandlers.rent)
router.post('/', booksHandlers.create)
router.delete('/:id', booksHandlers.delete)

module.exports = router
