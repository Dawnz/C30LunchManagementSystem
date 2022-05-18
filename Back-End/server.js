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
        res.render('trainee')
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
       res.redirect('/')
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
// created login for user
app.get('/login', (req, res)=>{
    let f_name = req.body.f_name;
    let l_name = req.body.l_name;

    let sql = "SELECT * FROM canteen.trainees where f_name="+'f_name'+" and l_name="+"lname";
    let query = connection.query(sql, (err, rows) =>{
        if (err) console.log('login unsuccessful');
        else console.log('login query ran')
        //user is the data passed
        res.render('menu', {
            user: rows[0]
        })
    })
})

app.get('/order/:userId',(req, res)=>{
    let userId = req.params.userId;
    let sql = `Select * from canteen.trainees where id = ${userId}`
    let query = connection.query(sql,(err, result)=>{
        if (err) {
            throw err
        }
        res.render("check-orders",{
            userId:userId,
            lunchOrder:result,
        })
    })
})
//this is called when an order is placed
app.post('/addOrderItem',(req, res)=>{
    let trainee_id=req.body.trainee_id;
    let data ={
        meal_option_id:req.body.meal_option_id,
        trainee_id:req.body.trainee_id,
        date:new Date(Date.now()),
    }
    let sql = "INSERT INTO canteen.trainee_options SET ?"

    let query = connection.query(sql,data,(err,results)=>{
        if (err) {
            throw err
        }
        //check for the main redirect with user id
        res.redirect("/",{
            id :trainee_id
        })
    })
})

app.get('/viewUserItem/:id', (req,res)=>{
    const id = req.params.id
    let sql = `SELECT * FROM canteen.trainees, canteen.meal_options WHERE trainee_id = ${id}`
    let query = connection.query(sql,(err, result)=>{
        if (err){
            throw err
        }
        res.render("trainee",{ 
            userOrders: result[0]
        })
    })
})



//port listening
app.listen(port, ()=> { console.log(`Listening on port ${port}`)})