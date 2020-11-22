const express = require("express")
const router = express.Router()
const services = require("../services")
const {users} = require('../handlers')
const {authenticate} = require('../middlewares')

const usersHandlers = users(services)
router.get('/', authenticate, usersHandlers.get)
router.put('/:id', authenticate, usersHandlers.update)
router.delete('/:id', authenticate, usersHandlers.delete)
router.get('/:id', authenticate, usersHandlers.getById)

module.exports = router
