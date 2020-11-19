const express = require("express")
const router = express.Router()
const services = require("../services")
const {books} = require('../endpoints')

const booksHandlers = books(services)
router.get('/', booksHandlers.get)
router.post('/', booksHandlers.post)
router.put('/:id', booksHandlers.put)
router.delete('/:id', booksHandlers.delete)

module.exports = router
