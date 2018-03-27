const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
  title: String,
  description: String
})

const Subject = mongoose.model("Subject", SubjectSchema)

module.exports = Subject
