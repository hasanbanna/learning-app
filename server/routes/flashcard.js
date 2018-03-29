const mongoose = require('mongoose')
const FlashCard = require('../models/flashcard')

module.exports = {
  /**
   * GET /flashcard - retrieve all flashcards
   */
 getFlashCards: (req, res) => {
   const query = FlashCard.find({})
   query.exec( (err, flashcard) => {
    if(err) res.send(err)
    res.send(flashcard)
   })
 },

 /**
  * POST /flashcard/:topicId - create a new flashcard for a topic
  */
 postFlashCard: (req,res) => {
   const newFlashCard = new FlashCard(req.body)
   newFlashCard.save((error, flashcard) => {
      if(error) res.send(error)
      res.send({ success: true, message: 'Flashcard saved successfully'})
   })
 },

 /**
  * GET /flashcard - get a flashcard for a topic
  */
 getFlashCard: (req, res) => {
   FlashCard.find({"topic": req.params.topicId}, (error, flashcard) =>{
    if(error) res.send(error)
    res.send(flashcard)
   })
 },

 /**
  * DELETE /flashcard/:topicId - delete a flashcard for a topic
  */
 deleteFlashCard: (req, res) => {
   FlashCard.remove({
     _id: req.params.id
   }, (err, flashcard)=> {
      if(err) res.send(err)
      res.send({
        success: true
      })
   })
 }
}
