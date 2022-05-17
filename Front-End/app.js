const express = require('express')
const app = express()
const PORT = 5050;

app.listen(process.env.PORT || PORT, () => console.info(`App listening on port ${PORT}`))

const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash')
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// set where view files will be directed to
app.set('views', __dirname + '/views')
// set where layout files will be directed to
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Routes import
const home = require('./routes/home')

app.use('/home', home)