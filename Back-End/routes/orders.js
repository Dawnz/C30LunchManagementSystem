const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/meal-orders', (req, res) => {
    res.render('orders-template')
})

module.exports = router