const express = require("express")
const router = express.Router()
const services = require("../services")
const {rents} = require('../handlers')
const {authenticate} = require('../middlewares')

const rentsHandlers = rents(services)
router.get('/', authenticate, rentsHandlers.list)
router.post('/:id', authenticate, rentsHandlers.rent)
router.put('/return/:id', authenticate, rentsHandlers.return)
// router.put('/:id', authenticate, rentsHandlers.update)
// router.get('/:id', authenticate, rentsHandlers.getByRenter)
// router.get('/:id', authenticate, rentsHandlers.getByBook)

module.exports = router
