const express = require('express');
const port = 5000
const bodyParser = require('body-parser');
const db = require('./database/db')
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const traineesRoute = require('./routes/trainees');
const menuRoute = require('./routes/menu');
const orders = require('./routes/orders');
const meals = require('./routes/meals');
const register = require('./routes/register');
const ordersTable = require('./routes/order_table')
const orderSummary = require('./routes/orderSummary')

app.use('/', traineesRoute);
app.use('/', menuRoute);
app.use('/', orders);
app.use('/meals', meals);
app.use('/register', register);
app.use('/', ordersTable)
app.use('/ordersummary', orderSummary)

app.get('/', (req,res) =>{
    res.render('home-template')
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