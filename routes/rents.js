const express = require("express")
const router = express.Router()
const services = require("../services")
const {rents} = require('../endpoints')
const {authenticate} = require('../middlewares')

const rentsHandlers = rents(services)
const authHandlers = authenticate()
router.get('/', authHandlers.admin, rentsHandlers.list)
router.post('/id/:id', authHandlers.admin, rentsHandlers.rent)
router.put('/return/id/:id', authHandlers.admin, rentsHandlers.return)

module.exports = router
