// const express = require('express')
// const cors = require('cors')
// const server = express()

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/petshare', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// server.listen(3333, () => console.log('Server ready on port 3333'))
// server.use(express.json())
// server.use(cors())
// server.set('json spaces', 2)

// server.use('/cards', require('./routes/cards'))


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/keys').mongoURI
const passport = require('passport')
const users = require('./routes/users')
const cards = require('./routes/cards')

const app = express()

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.set('json spaces', 2)

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Routes
app.use("/users", users)
app.use('/cards', cards)

const port = 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))