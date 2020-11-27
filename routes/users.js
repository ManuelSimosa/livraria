const express = require("express")
const router = express.Router()
const services = require("../services")
const {users} = require('../endpoints')
const {authenticate} = require('../middlewares')

const usersHandlers = users(services)
const authHandlers = authenticate()
router.get('/', authHandlers.admin, usersHandlers.get)
router.put('/id/:id', authHandlers.admin, usersHandlers.update)
router.delete('/id/:id', authHandlers.admin, usersHandlers.delete)
router.get('/id/:id', authHandlers.admin, usersHandlers.getById)

module.exports = router
