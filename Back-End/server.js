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


//port listening
app.listen(port, ()=> { console.log(`Listening on port ${port}`)})