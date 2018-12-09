const express = require('express');
const route = express.Router();
const FirstScreenModel = require('../db/first-screen');
const mongoose = require('mongoose')



route.get('/category_value_list', (req, res) => {
    FirstScreenModel.find()
        .exec(function (err, firstscreenmodels) {
            if (err) throw err;
            var newArray = [];
            firstscreenmodels.forEach(current => {
                if (!newArray.includes(current.category)) {
                    newArray.push(current.category);       // array of all not same values of the field category, or of the field component
                }
            });
            console.log('***************** Categories *****************');
            console.log(newArray.join());
            res.write(JSON.stringify({ message: `No duplicate category values array`, arrayResult: newArray }));
            res.end();
        });
});

route.get('/component_value_list', (req, res) => {

    FirstScreenModel.find()
    .exec(function (err, firstscreenmodels) {
        if (err) throw err;
        var newArray = [];
        firstscreenmodels.forEach(current => {
            if (!newArray.includes(current.component)) {
                newArray.push(current.component); // array of all not same values of the field category, or of the field component
            }
        });
        console.log('***************** Components *****************');
        console.log(newArray.join());
        res.write(JSON.stringify({ message: `No duplicate component values array`, arrayResult: newArray }));
        res.end();
    });
});

route.get('', (req, res) => {
    FirstScreenModel.find()
        .exec(function (err, firstscreenmodels) {
            if (err) throw err;

            console.log('***************** Whole collection *****************');
            console.log(firstscreenmodels.join());
            res.write(JSON.stringify({ message: `Whole collection`, arrayResult: firstscreenmodels }));
            res.end();
        });
});

route.get('/find_category/:category?', (req, res) => {
    var category = req.query.category;
    FirstScreenModel.find({ category: category })
    
    .exec(function (err, firstscreenmodels) {
        
            if (err) throw err;

            console.log('*****************');
            console.log(`Succesfully filterder by category: ` + category);
            console.log(' arrayResult: ' + firstscreenmodels);
            res.write(JSON.stringify({ message: `Succesfully filterder by category: ${category}`, arrayResult: firstscreenmodels }));
            res.end();
        });
});

route.get('/find_component/:component?', (req, res) => {
    var component = req.query.component;
    FirstScreenModel.find({ component: component })
        .exec(function (err, firstscreenmodels) {
            if (err) throw err;

            console.log('*****************');
            console.log(`Succesfully filterder by component: ` + component);
            console.log(' arrayResult: ' + firstscreenmodels);
            res.write(JSON.stringify({ message: `Succesfully filterder by component: ${component}`, arrayResult: firstscreenmodels }));
            res.end();
        });
});

route.post('/save_to_db', (req, res) => {
    var jsonNewLine = req.body;
    var firstInstance = new FirstScreenModel(jsonNewLine);
    var findOneResult;

    FirstScreenModel.findOne({
        category: new RegExp(jsonNewLine.category, 'i'),
        component: new RegExp(jsonNewLine.component, 'i')
    })
        .exec(function (err, verification) {
            if (err) throw err;
            findOneResult = verification;
            console.log('verification ' + verification);
            if (verification !== null) {
                console.log('Document is already exists');
                res.write(`Document is already exists`);
                res.end();
            }
            if (findOneResult == null) {
                firstInstance.save()
                    .then((result) => {
                        console.log('*****************');
                        console.log('Document succesfully saved to DB');
                        console.log(result);
                        res.write(JSON.stringify({ message: `Document succesfully saved to DB`, objectResult: result }));
                        res.end();
                    })
                    .catch(err => {
                        res.write(`Error occured`);
                        res.end();
                    });
            }
        })
});

route.post('/edit_due_to_id', (req, res) => {
    var id = req.body._id;
    FirstScreenModel.findByIdAndUpdate(id, req.body, { new: true }, function (err, resultObj) {
        if (err) throw err;
        console.log('*****************');
        console.log('Document that should be edited: ');
        console.log(resultObj);
        resultObj.save()
        console.log('Document after edition: ');
        console.log(resultObj);
        res.write(JSON.stringify({ message: `Document succesfully edited`, objectResult: resultObj }));
        res.end();
    });
});

route.delete('/delete_due_to_id', (req, res) => {
    var id = req.body.id;
    FirstScreenModel.deleteOne({ _id: id }, function (err) {
        if (err) throw err;
        console.log('*****************');
        console.log('Document with ID : ' + id + ' succesfully deleted from database');
        res.write('Document with ID : ' + id + ' succesfully deleted from database');
        res.end();
    })

}
)



module.exports = route;