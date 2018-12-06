const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var firstScreenSchema = new Schema({
   category: String,
   component: String,
   low_complexity: Number,
   med_complexity: Number,
   high_complexity: Number
});

var firstScreenModel = mongoose.model('firstScreenModel', firstScreenSchema);




module.exports = firstScreenModel;