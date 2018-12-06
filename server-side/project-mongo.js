const mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/project';
mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var firstScreenSchema = new Schema({
   category: String,
   component: String,
   low_complexity: Number,
   med_complexity: Number,
   high_complexity: Number
});

var firstScreenModel = mongoose.model('firstScreenModel', firstScreenSchema);


var instance1 = new firstScreenModel  (
    {
        category: 'web',
        component:'Build Chat room\'s',
        low_complexity: 2,
        med_complexity: 3,
        high_complexity: 4
    });

instance1.save(function (err){
    if (err) return handleError
})

const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.headers);
    
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   res.write(JSON.stringify( req.headers) )
   res.write('just another text' )
   res.end('finish message');
   
 
 });

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log("Avremi");
    
});
