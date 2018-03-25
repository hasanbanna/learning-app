const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Post = require("./models/post")
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


// create a new post

app.post('/posts', (req, res) => {
  const db = req.db
  const title = req.body.title
  const description = req.body.description
  const new_post = new Post({
    title: title,
    description: description
  })
  new_post.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// read all Posts

app.get('/posts', (req,res)=>{
  Post.find({}, 'title description', (error, posts)=>{
    if(error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

// Fetch single post

app.get('/post/:id', (req, res) => {
  const db = req.db
  Post.findById(req.params.id, 'title description', function (error, post){
    if(error) { console.error(error) }
    res.send(post)
  })
})

// Update a post

app.put('/posts/:id', (req, res) => {
  const db = req.db
  Post.findById(req.params.id, 'title description', function(error, post){
    if(error) { console.error(error) }
    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error){
      if(error){
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post

app.delete('/posts/:id', (req, res) => {
  const db = req.db
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if(err){
      res.send(err)
    }
    res.send({
      success: true
    })
  })
})

// Total number of posts

app.get('/postCount', (req, res)=>{
  const db = req.db
  Post.count(function(err, number){
    if(err){
      res.send(err)
    }
    res.send({
      count: number
    })
  })
})

app.listen(process.env.PORT || 8081)
