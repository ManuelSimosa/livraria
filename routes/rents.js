const express = require("express")
const router = express.Router()
const services = require("../services")
const {rents} = require('../endpoints')
const {authenticate} = require('../middlewares')

const rentsHandlers = rents(services)
router.get('/', authenticate, rentsHandlers.list)
router.post('/:id', authenticate, rentsHandlers.rent)
router.put('/return/:id', authenticate, rentsHandlers.return)

module.exports = router
