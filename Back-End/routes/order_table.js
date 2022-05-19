const express = require('express')
const router = express.Router();
const connection = require('../database/db')

router.get('/orderstable', (req, res) =>{
    let sql = "SELECT * FROM canteen.trainee_options"
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('connection unsuccessful');
        else console.log('orders table query ran')
        res.render('order_table')
    })
})

router.post('/addOrder', (req, res)=>{
    let data = {
        cohort: req.body.cohort,
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        date_joined: req.body.dateJoined
    }

    let sql = "INSERT INTO canteen.trainees SET ?"
    let query = connection.query(sql, data, (err, results) =>{
        if(err) throw err
    res.redirect('/orderstable');
})
})


module.exports = router