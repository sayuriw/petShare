const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'card' }],
  
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("users", UserSchema);

module.exports = User 