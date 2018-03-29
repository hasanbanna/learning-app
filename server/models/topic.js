const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema ({
  title: String,
  subject: { type: Schema.Types.ObjectId, ref: 'Subject'},
  createdAt: {type: Date, default: Date.now}
})

TopicSchema.pre('save', next => {
  now = new Date()

  if(!this.createdAt){
    this.createdAt = now
  }
  next()
})

module.exports =  mongoose.model("Topic", TopicSchema)
