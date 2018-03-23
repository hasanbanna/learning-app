const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/posts')
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("connection succeeded")
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    },
    {
      title: "What?",
      description: "Who is this?"
    }]
  )
})

app.listen(process.env.PORT || 8081)
