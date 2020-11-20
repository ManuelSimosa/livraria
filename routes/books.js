const express = require("express")
const router = express.Router()
const services = require("../services")
const {books} = require('../handlers')
const {authenticate} = require('../middlewares')

const booksHandlers = books(services)
router.get('/', authenticate, booksHandlers.get)
router.post('/', authenticate, booksHandlers.create)
router.put('/:id', authenticate, booksHandlers.update)
router.get('/:id', authenticate, booksHandlers.getOne)
router.delete('/:id', authenticate, booksHandlers.delete)

module.exports = router
