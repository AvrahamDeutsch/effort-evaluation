const express = require('express');
const route = express.Router();
const FirstScreenModel = require('../db/first-screen');
const mongoose = require('mongoose')


const app = express();
const port = 3000;

app.set('port', port);

var server = app.listen(app.get('port'), function () {
    console.log('app started on port', { port });
});


var mongoDB = 'mongodb://127.0.0.1/project';
mongoose.connect(mongoDB, { useNewUrlParser: true }, function () {


    route.get('/', (req, res) => {
        //  res.send(`Hello  from express`);
        FirstScreenModel.find()
            .exec(function (err, firstscreenmodels) {
                if (err) throw err;

                var keys = Object.keys(firstscreenmodels[0]);
                //    res.write('<h3>');
                    res.write(keys[0]);
                //    res.write('</h3>');
                


                res.end();
            }
            );

    });


    route.get('/save_to_db', (req, res) => {

        var firstInstance = new FirstScreenModel(
            {
                category: 'web',
                component: 'Build Chat room\'s',
                low_complexity: 2,
                med_complexity: 3,
                high_complexity: 4
            }
        );
        firstInstance.save()
            .then((result) => {
                console.log(result);
                console.log('Response after saving to db');
                //res.json({ message: `Saved to db successfully 2`, id: result._id });

                var category = firstInstance.category;
                var component = firstInstance.component;
                var low = firstInstance.low_complexity;
                var med = firstInstance.med_complexity;
                var high = firstInstance.high_complexity;

                res.write('<h1>');
                res.write('category : ' + category + ',   component : ' + component + ',   low : ' + low + ',   med : ' + med + ',   high : ' + high);
                res.write('</h1>');

            })
            .catch((err => { res.json({ message: `Error occured` }); })
            );


        var secondInstance = new FirstScreenModel(
            {
                category: 'server',
                component: 'Build Chat room\'s',
                low_complexity: 1,
                med_complexity: 1,
                high_complexity: 1
            }
        );
        secondInstance.save()
            .then((result) => {
                console.log(result);
                console.log('Response after saving to db');

                var category = secondInstance.category;
                var component = secondInstance.component;
                var low = secondInstance.low_complexity;
                var med = secondInstance.med_complexity;
                var high = secondInstance.high_complexity;

                res.write('<h1>');
                res.write('category : ' + category + ',   component : ' + component + ',   low : ' + low + ',   med : ' + med + ',   high : ' + high);
                res.write('</h1>');
                res.end();

            })
            .catch((err => { res.json({ message: `Error occured` }); })
            );

    });


    // route.post('/save_to_db', (req, res) => {
    //     const info = req.body;
    //     let firstInstance = FirstScreenModel(info);
    //     firstInstance.save()
    //         .then((result) => {
    //             console.log(result);
    //             console.log('Response after saving to db');
    //             res.json({ message: `Saved to db successfully`, objectSaved: result });
    //         }).catch((err => {
    //             res.json({ message: `Error ocuured` });
    //         })


    //         );

    // });



    // route.get('/first/:name', (req, res) => {
    //     const name = req.params.name;
    //     res.status(200).json({ message: `Hello to ${name} from express` });
    // });


});

app.use('/app', route);


module.exports = route;

