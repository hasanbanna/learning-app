const mongoose = require('mongoose')
const Topic = require('../models/topic')

module.exports = {

  /**
  * GET /topic route retrieve all the topics
  */
  getTopics: (req,res) => {
    const query = Topic.find({})
    query.exec((err, topics) => {
      if(err) res.send(err)
      res.send(topics)
    })
  },

  /**
   * POST /topic/:subjectId route to create a new topic related to a subject
   */
  postTopic: (req, res) => {
    const newTopic = new Topic(req.body)
    newTopic.save(function(error, subject){
      if(error){
        res.send(error)
      }else{
        res.send({
          success: true,
          message: 'Topic saved successfully '
        })
      }
    })
  },

  /**
   * GET /topic/:subjectId gets a topic with a given subject id
   */
  getTopic: (req, res) => {
    Topic.find({"subject" : req.params.subjectId}, function(error, topic){
      if(error) { console.error(error) }
      res.send(topic)
    })
  },

  /**
   * DELETE /topic/:subjectId delete a topic with a given subject id
   */
  deleteTopic: (req, res) => {
    Topic.remove({
      _id: req.params.id
    }, function (err, topic){
      if(err){
        res.send(err)
      }
      res.send({
        success: true
      })
    })
  }
}
