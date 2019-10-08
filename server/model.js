const mongoose = require('mongoose')

const Card = mongoose.model('Card', {
  title: String,
  description: String,
  isBookmarked: Boolean,
  tags: Object,
  email: String,
  picture: String
})
module.exports = Card
