const port = 5000
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'canteen'
})

//run test to see if database is connected
connection.connect(function(error){
    if (!error) console.log('Canteen Database Connected')
    else console.log(error)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req,res) =>{
    res.render('index')
})

//trainee display route
app.get('/trainees', (req, res) =>{
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
app.get('/add', (req,res) =>{
    res.render('add_trainee')
})

//save trainee
app.post('/save-trainee', (req,res)=>{
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
app.get('/edit/:userId',(req,res)=> {
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
app.get('/delete/:userId',(req,res)=> {
    const userId = req.params.userId
    let sql = `DELETE FROM canteen.trainees WHERE id = ${userId}`
    let query = connection.query(sql, (err, result) =>{
        if (err) throw err
        //redirect to wherever enuh dawgs. idk how the front set up
       res.redirect('/trainees')
    })
})

//menu display route
app.get('/menu', (req, res) =>{
    let sql = "SELECT * FROM canteen.meal_options"
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('connection unsuccessful');
        else console.log('menu query ran')
        res.render('menu', {
            menu: rows
        })
    })
})

//port listening
app.listen(port, ()=> { console.log(`Listening on port ${port}`)})