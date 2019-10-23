const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: '',
  },
  bookmarkedCards: Array,
  
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const Session = mongoose.model('UserSession', sessionSchema)

module.exports = Session
