const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Subject = require('./models/subject')
const Topic = require('./models/topic')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/knowledge_tree')
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("connection succeeded")
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// create a new subject

app.post('/subjects', (req, res) => {
  const db = req.db
  const title = req.body.title
  const newSubject = new Subject({
    title: title
  })
  newSubject.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Subject saved successfully!'
    })
  })
})

// read all subjects

app.get('/subjects', (req,res)=>{
  Subject.find({}, 'title', (error, subjects)=>{
    if(error) { console.error(error); }
    res.send({
      subjects: subjects
    })
  }).sort({_id:-1})
})

// Fetch single subject

app.get('/subject/:id', (req, res) => {
  const db = req.db
  Subject.findById(req.params.id, 'title', function (error, subject){
    if(error) { console.error(error) }
    res.send(subject)
  })
})

// Update a subject

app.put('/subjects/:id', (req, res) => {
  const db = req.db
  Subject.findById(req.params.id, 'title', function(error, subject){
    if(error) { console.error(error) }
    subject.title = req.body.title
    subject.save(function (error){
      if(error){
        console.log(error)
      }
      res.send({
        success: true,
        message: "Subject was updated successfully"
      })
    })
  })
})

// Delete a subject

app.delete('/subjects/:id', (req, res) => {
  const db = req.db
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
})

// Total number of posts

app.get('/subjects/count', (req, res)=>{
  const db = req.db
  Subject.count(function(err, number){
    if(err){
      res.send(err)
    }
    res.send({
      count: number
    })
  })
})

// add new topic for associated with a subject

app.post('/topics/:subjectId', (req, res) =>{
  const db = req.db
  const title = req.body.title
  const subjectId = req.body.subjectId
  const newTopic = new Topic({
    title: title,
    subject: subjectId
  })
  newTopic.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Topic saved successfully!'
    })
  })
})

// Get all topics for a subject

app.get('/topics/:subjectId', (req,res) =>{
  const db = req.db
  Topic.find({"subject" : req.params.subjectId}, 'title', function(error, topic){
    if(error) { console.error(error) }
    res.send(topic)
  })
})

// Get all topics

app.get('/topics', (req,res) =>{
  const db = req.db
  Topic.find({}, 'title subject', function(error, topic){
    if(error) { console.error(error) }
    res.send(topic)
  })
})
app.listen(process.env.PORT || 8081)
