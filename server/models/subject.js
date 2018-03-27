const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
  title: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
})

SubjectSchema.pre('save', next => {
  now = new Date()
  if(!this.createdAt){
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model('Subject', SubjectSchema)

