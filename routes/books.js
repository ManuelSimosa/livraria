const express = require("express")
const router = express.Router()
const services = require("../services")
const {books} = require('../endpoints')
const {authenticate} = require('../middlewares')

const booksHandlers = books(services)
const authHandlers = authenticate()
router.get('/', authHandlers.noAdmin, booksHandlers.get)
router.post('/', authHandlers.admin, booksHandlers.create)
router.put('/:id', authHandlers.admin, booksHandlers.update)
router.get('/:id', authHandlers.noAdmin, booksHandlers.getOne)
router.delete('/:id', authHandlers.admin, booksHandlers.delete)

module.exports = router
