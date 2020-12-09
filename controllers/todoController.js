var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://Demartechx:Kc83Zq6NkRJZDQck@nodejsapp.qxsrp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } );

//Create scheme - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(bodyParser.json());

module.exports = function(app){
    app.get('/', (req, res)=>{
        //redirect home to todo route
        res.redirect('/todo')
    })
    
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data}); 
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
            //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });

    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        // Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        //     if (err) throw err;
        //     res.json(data);
        // });

        Todo.deleteOne(req.params, (err, data) => {
            if (err) throw err;
            res.json(data)
        })
    });


    
}