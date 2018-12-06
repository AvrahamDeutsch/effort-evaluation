const mongoose = require('mongoose');

var Schema = mongoose.Schema;







var project = new Schema({
    _id:String,
    projectName: String,
    projectID: Number,
    taskContainers: [
        {
        containerName: String,
            category: String,
            days: Number,
            milestoneName: Number,
            tasks: [
                {
                    taskName: String,
                    days: Number,
                    documentComponentId: String,
                    complexity: String,
                    details: String,
                    assumptions: String
                },
            ]
        },
    ]
});

module.exports = mongoose.model('projectModel', project);
