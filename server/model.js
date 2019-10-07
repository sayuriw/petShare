const mongoose = require('mongoose')

const Card = mongoose.model('Card', {
  title: String,
  description: String,
  isBookmarked: Boolean,
  tags: [String],
  email: String,
  picture: String
})

module.exports = Card