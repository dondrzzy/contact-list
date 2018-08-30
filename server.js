//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const index = require('./routes/index');
const route = require('./routes/route');

//connect to mongodb
mongoose.connect('localhost:27017/contact-list');
// on conn
mongoose.connection.on('connected', function(){
    console.log('connected to database at 27017');
});
//incase of error in conn
mongoose.connection.on('error', function(err){
    if(err){ console.log('Error in database conn', err);}    
});

//port no
const port = 3000;

//add middleware
app.use(cors());
app.use(bodyParser.json());

//view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

//routes
app.use('/', index);
app.use('/api/v1', route);

//testing server
// app.get('/', function(req, res){
//     res.send('foobar home');
// });

//bind server with the port
app.listen(port, function(){
    console.log('server started at port 3000');
});