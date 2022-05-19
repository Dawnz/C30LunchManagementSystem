const express = require('express')
const router = express.Router();
const connection = require('../database/db')

router.get('/orderstable', (req, res) =>{
    // let sql = "SELECT * FROM canteen.trainee_options";
   let sql = "SELECT mc.category_name,mo.option_name FROM canteen.meal_categories mc, meal_options mo where mc.id = mo.meal_category_id"
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('connection unsuccessful');
        
        else console.table(rows);
        res.render('order_table',{data:rows})
       
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