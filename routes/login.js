const express = require("express")
const router = express.Router()
const services = require("../services")
const {users} = require('../endpoints')

const usersHandlers = users(services)
router.post('/new', usersHandlers.create)
router.post('/auth', usersHandlers.auth);

module.exports = router
