const express = require('express')
const router = express.Router();

const connection = require('../database/db')

//menu display route
router.get('/menu', (req, res) =>{
    let sql = "SELECT * FROM canteen.meal_options"
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('connection unsuccessful');
        else console.log('menu query ran')
        res.render('menu', {
            menu: rows
        })
    })
})

module.exports = router