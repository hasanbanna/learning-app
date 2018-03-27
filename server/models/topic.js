const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema ({
  title: String,
  subject: { type: Schema.Types.ObjectId, ref: 'Subject'}
})

const Topic = mongoose.model("Topic", TopicSchema)

module.exports = Topic
