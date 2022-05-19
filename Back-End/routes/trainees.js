const express = require('express')
const router = express.Router();
const connection = require('../database/db')

//trainee display route
router.get('/trainees', (req, res) =>{
    let sql = "SELECT * FROM canteen.trainees"
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('connection unsuccessful');
        else console.log('trainee query ran')
        res.render('trainee', {
            trainees: rows
        })
        
    })
})

//add trainee
router.get('/add', (req,res) =>{
    res.render('add_trainee')
})

//save trainee
router.post('/save-trainee', (req,res)=>{
    let data = {
        cohort: req.body.cohort,
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        date_joined: req.body.dateJoined
    }
    let sql = "INSERT INTO canteen.trainees SET ?"
    let query = connection.query(sql, data, (err, results) =>{
        if(err) throw err
        res.redirect('/')
    })
})

//edit page
router.get('/edit/:userId',(req,res)=> {
    const userId = req.params.userId
    let sql = `SELECT * FROM canteen.trainees WHERE id = ${userId}`
    let query = connection.query(sql, (err, result) =>{
        if (err) throw err
        res.render('edit_trainee', {
            trainee: result[0]
        })
    })
})

//delete route
router.get('/delete/:userId',(req,res)=> {
    const userId = req.params.userId
    let sql = `DELETE FROM canteen.trainees WHERE id = ${userId}`
    let query = connection.query(sql, (err, result) =>{
        if (err) throw err
        //redirect to wherever enuh dawgs. idk how the front set up
       res.redirect('/trainees')
    })
})

module.exports = router