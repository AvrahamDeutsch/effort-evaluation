const express = require('express');
const app = express();

app.use(function (req, res, next) {
        res.header('Content-Type','text/plain');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Max-Age', 86400)
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next(); 
});


  

const mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/project';
var db = mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const firstRoute = require('./router/first');
const catalogManager = require('./router/catalogManager');

// app.use('/requests', firstRoute);
app.use('/app', firstRoute);
app.use('/cm', catalogManager);

app.listen(8080);
console.log("The server is connected!");


        