const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
    res.render('orders-template')
})

module.exports = router