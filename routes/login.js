const express = require("express")
const router = express.Router()
const services = require("../services")
const {users} = require('../handlers')

const usersHandlers = users(services)
router.post('/new', usersHandlers.create)
router.post('/auth', usersHandlers.auth);
router.post('/check', usersHandlers.check);

module.exports = router
