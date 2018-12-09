const express = require('express');
const router = express.Router();

const projectModel = require('../db/catalog.js')


router.post("/new_project", function (req, res) {
console.log( req.body.projectName);
console.log( req.body.projectID);

    let newProject = new projectModel({
        _id:`${req.body.projectID + 1}`,
        projectName : req.body.projectName,
        projectID:req.body.projectID,

    });
    
    newProject.save(function (err, new_Project) {

        if (!err) {
            res.send('new project created');
        } else {
            res.send(err);
        }
    });
});





//** create new component */

router.get('', function (req, res) {
   
    
       
   
    res.send("is Avi")
})

module.exports = router;




// router.put('/:projectId', function (req, res) {

//     let { name, description } = req.body;
  
//     Project.findById(req.params.projectId, (err, project) => {
  
//       if (!err) {
  
//         const newActor = {
//           name: name,
//           description: description,
//           userStoreis: [],
//         }
//         let currentVersion = project.allVersions[project.allVersions.length - 1];
//         currentVersion.allActors.push(newActor);
  
//         project.save((err, version) => {
//           if (!err) {
//             res.send('new actor added');
  
//           } else {
//             res.send(err);
//           }
//         });
//       } else {
//         res.send(err);
//       }
//     })
//   });
  