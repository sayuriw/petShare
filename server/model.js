const mongoose = require('mongoose')

const Card = mongoose.model('Card', {
  title: String,
  description: String,
  isBookmarked: Boolean,
  tags: [String],
})

module.exports = Card