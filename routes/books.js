const express = require("express")
const router = express.Router()
const axios = require('axios')
const {books} = require('../endpoints')

const booksHandlers = books({axios})
router.get('/', booksHandlers.get)
router.post('/', booksHandlers.post)
router.put('/:id', booksHandlers.put)
router.delete('/:id', booksHandlers.delete)

module.exports = router
