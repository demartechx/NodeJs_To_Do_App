var express = require('express');
var todoController = require('./controllers/todoController.js');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'))

//fire controllers
todoController(app);

//listen to port
app.listen(process.env.PORT || 3000)
console.log(`listening to port ${process.env.PORT ? process.env.PORT : 3000}`);