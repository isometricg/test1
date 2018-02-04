const path = require('path')
var login = require('./register/login');
var registration = require('./register/registration');
var finduser = require('./finduser');
var express = require('express')
var exphbs = require('express-handlebars')

const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))


app.engine('.hbs', exphbs({
	defaultLayout: 'layout',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/'),
	
}));

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function(request, response) {
	response.render('welcome')
	//login.login
	//console.log(request.body.username)
})

app.get('/login', function(request, response) {
	response.render('login')
})

app.get('/registration', function(request, response) {
	response.render('registration')
})
//app.post('/welcome', lgn);
app.post('/registration', registration.registration);
app.post('/login', login.login);
app.post('/finduser', finduser.finduser);


module.exports = app
