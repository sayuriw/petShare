const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/Session')

//user sign up

router.post('/signup', async (req, res, next) => {
  const { password, repeatedPassword, name } = req.body
  let { email } = req.body

  if (!name) {
    return res.send({
      success: false,
      message: 'Name field can not be blank.'
    })
  }

  if (!email) {
    return res.send({
      success: false,
      message: 'Email field can not be blank.'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Please give your password.'
    })
  }

  if (!repeatedPassword) {
    return res.send({
      success: false,
      message: 'Please repeat your password.'
    })
  }

  if (repeatedPassword !== password) {
    return res.send({
      success: false,
      message: 'Password does not match.'
    })
  }

  email = email.toLowerCase()

  try {
    // verify email
    const existingUsers = await User.find({ email: email })
    
    if (existingUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: account already exists.'
      })
    }

    // save new user
    const user = await User.create({
      email,
      password: User.generateHash(password),
      name
    })

    return res.send({
      success: true,
      message: 'You are now registered',
      userId: user._id,
      bookmarkedCards: user.bookmarkedCards
    })
  } catch (err) {
    console.error(err)
    return res.send({
      success: false,
      message: 'Error (Server Error).'
    })
  }
})

//user login

router.post('/login', async (req, res, next) => {
  const { password } = req.body
  let { email } = req.body

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: email can not be empty.'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Error: password can not be empty.'
    })
  }

  email = email.toLowerCase()

  try {
    const users = await User.find({ email: email })
    
    if (users.length !== 1) {
      return res.send({
        success: false,
        message: 'Error: invalid email'
      })
    }

    const user = users[0]
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: wrong password'
      })
    }

    const userSession = new UserSession()
    userSession.userId = user._id
    userSession.bookmarkedCards = user.bookmarkedCards
    
    const doc = await userSession.save()
    
    return res.send({
      success: true,
      message: 'Signed in',
      userId: userSession.userId,
      bookmarkedCards: user.bookmarkedCards,
      token: doc._id
    })
  } catch (err) {
    console.error(err)
    return res.send({
      success: false,
      message: 'Server Error'
    })
  }
})

// user logout

router.get('/logout', async (req, res, next) => {
  const { query } = req
  const { token } = query

  try {
    await UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      }
    )

    return res.send({
      success: true,
      message: 'You are logged out'
    })
  } catch (err) {
    console.error(err)
    return res.send({
      success: false,
      message: 'Server Error'
    })
  }
})

//Verifizierung
router.get('/verify', async (req, res, next) => {
  const { query } = req
  const { token } = query

  try {
    const sessions = await UserSession.find({
      _id: token,
      isDeleted: false
    })

    if (sessions.length !== 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      })
    }

    return res.send({
      success: true,
      message: 'Verified'
    })
  } catch (err) {
    console.error(err)
    return res.send({
      success: false,
      message: 'Error: Server Error'
    })
  }
})

router.get('/delete-test-users', async (req, res) => {
  try {
    const users = await User.find({ name: 'TestUser' })
    await Promise.all(users.map(user => user.remove()))
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.json({ success: false, message: 'Server Error' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.send({
        success: false,
        message: 'User not found'
      })
    }
    return res.send(user)
  } catch (err) {
    console.error(err)
    return res.send({
      success: false,
      message: 'Server error'
    })
  }
})

router.patch('/:id', async (req, res, next) => {
  const { petId } = req.body
  const userId = req.params.id
  const userModel = await User.findById(userId)
  
  if (userModel) {
    let bookmarkedCards = userModel.bookmarkedCards

    if (!bookmarkedCards.includes(petId)) {
      bookmarkedCards = [...bookmarkedCards, petId]
    } else {
      const petIndex = bookmarkedCards.findIndex(
        bookmarkedCard => bookmarkedCard === petId)
      bookmarkedCards = [
        ...bookmarkedCards.slice(0, petIndex),
        ...bookmarkedCards.slice(petIndex + 1)
      ]
    }

    userModel.bookmarkedCards = bookmarkedCards
    const savedUser = await userModel.save()
    return res.json(savedUser)
  } else {
    return res.send({ success: false })
  }
})

module.exports = router
