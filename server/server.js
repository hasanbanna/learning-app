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
const topic = require('./routes/topic')

// Subject routes
app.route('/subject')
  .get(subject.getSubjects)
  .post(subject.postSubject)

app.route('/subject/:id')
  .get(subject.getSubject)
  .put(subject.updateSubject)
  .delete(subject.deleteSubject)

  // Total number of posts

app.get('/subjects/count', (req, res) =>{
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

app.route('/topic')
  .get(topic.getTopics)
  .post(topic.postTopic)

app.route('/topic/:subjectId')
  .get(topic.getTopic)

app.route('/topic/:id')
  .delete(topic.deleteTopic)

app.listen(config.port, function(err){
  if(err) throw err
  console.log(`App listening on port ${config.port}`)
})

module.exports = app
