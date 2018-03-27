const mongoose = require('mongoose')
const Subject = require('../models/subject')

/**
 * GET /subject route to retrieve all the subjects
*/
function getSubjects(req, res){
  const query = Subject.find({})
  query.exec((err, subjects) =>{
    if(err) res.send(err)
    res.send(subjects)

  })
}

/**
 * POST /subjects route to create a new subject
 */
function postSubject(req, res){
  const newSubject = new Subject(req.body)

  newSubject.save(function(error, subject){
    if(error){
      res.send(error)
    }else{
      res.send({
        success: true,
        message: 'Subject saved successfully!',
        subject
      })
    }

  })
}

/**
 * Get a subject with a given id
 */
function getSubject(req, res){
  const db = req.db
  Subject.findById(req.params.id, 'title', (error, subject) => {
    if(error) { console.error(error) }
    res.send(subject)
  })
}

/**
 * Update a subject with a given id
 */
function updateSubject(req, res) {
  Subject.findById(req.params.id, 'title', function(error, subject){
    if(error) { console.error(error) }
    subject.title = req.body.title
    subject.save(function (error){
      if(error){
        console.log(error)
      }
      res.send({
        success: true,
        message: "Subject was updated successfully",
        error: "Subject could not be updated"
      })
    })
  })
}
/**
 * Delete a subject with a given id
 */
function deleteSubject(req, res){
  Subject.remove({
    _id: req.params.id
  }, function(err, subject){
    if(err){
      res.send(err)
    }
    res.send({
      success: true
    })
  })
}
module.exports = { getSubjects, getSubject, postSubject, updateSubject, deleteSubject}
