var express = require('express');
var totoController = require('./controllers/todoControler');
const todoController = require('../controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'))

//fire controllers
todoController(app);

//listen to port
app.listen(3000)
console.log('listening to port 3000');