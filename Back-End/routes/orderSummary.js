const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/', (req, res) => {
    res.render('orderSummary-template')
})


module.exports = router