const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: Object,
  email: String,
  picture: String,
  createdDate: Date,
})

cardSchema.pre('save', function(next) {
  this.createdDate = new Date()
  next()
})

const Card = mongoose.model('Card', cardSchema)



module.exports = Card
