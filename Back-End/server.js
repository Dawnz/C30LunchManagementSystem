const bodyParser = require('body-parser')
const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
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