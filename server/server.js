const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

// Connection
const mongoose = require('mongoose')
mongoose.connect(config.db)
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
// db.once("open", function(callback){
//   console.log("connection succeeded")
// })

const app = express()
  app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(cors())


// Routes

const subject = require('./routes/subject')

// Subject routes
app.route('/subject')
  .get(subject.getSubjects)
  .post(subject.postSubject)

app.route('/subject/:id')
  .get(subject.getSubject)
  .put(subject.updateSubject)
  .delete(subject.deleteSubject)

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

app.post('/topics', (req, res) =>{
  const db = req.db
  const title = req.body.title
  const subject = req.body.subject
  const newTopic = new Topic({
    title: title,
    subject: subject
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

app.listen(config.port, function(err){
  if(err) throw err
  console.log(`App listening on port ${config.port}`)
})

module.exports = app
