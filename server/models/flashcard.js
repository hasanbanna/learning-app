const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlashCardSchema = new Schema({
  question: { type: String, required: true },
  answer: {type: String, required: true},
  topic: { type: Schema.Types.ObjectId, ref: 'Topic'},
  createdAt: {type: Date, default: Date.now}
})

FlashCardSchema.pre('save', next => {
  now = new Date()
  if(!this.createdAt){
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model('FlashCard', FlashCardSchema)
