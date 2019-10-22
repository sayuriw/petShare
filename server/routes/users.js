const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/Session')

//user sign up

router.post('/signup', (req, res, next) => {
  
  const {
    password,
    repeatedPassword,
    name
  } = req.body
  let { email } = req.body


  if (!name) {
    res.send({
      success: false,
      message: 'Name field can not be blank.'
    })
  }
  
  if (!email) {
    res.send({
      success: false,
      message: 'Email field can not be blank.'
    })
  }

  if (!password) {
    res.send({
      success: false,
      message: 'Please give your password.'
    })
  }

  if (!repeatedPassword) {
    res.send({
      success: false,
      message: 'Please repeat your password.'
    })
  }

  if (repeatedPassword !== password) {
    res.send({
      success: false,
      message: 'Password does not match.'
    })
  }

  email = email.toLowerCase()

  // verify email

  User.find(
    {
      email: email
    },
    (err, existingUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        })
      } else if (existingUsers.length > 0) {
        res.send({
          success: false,
          message: 'Error: account already exists.'
        })
      }

      // save new user

      User.create(
        {
        email,
        password: User.generateHash(password),
        name

        }).then(() => res.send({
          success: true,
          message: 'You are now registered'
        }))
        .catch(() => res.send({
          success: false,
          message: 'Error (Server Error).'
        }))
    }
  )
})

//user login

router.post('/login', (req, res, next) => {
  
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
  
  User.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        console.log('err 2:', err)
        return res.send({
          success: false,
          message: 'server Error'
        })
      }
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
      } //  currect user
      const userSession = new UserSession()
      userSession.userId = user._id
      userSession.save((err, doc) => {
        if (err) {
          console.log(err)
          return res.send({
            success: false,
            message: 'Server Error'
          })
        }
        return res.send({
          success: true,
          message: 'Signed in',
          userId: userSession.userId,
          token: doc._id
        })
      })
    }
  )
})

// user logout

router.get('/logout', (req, res, next) => {
  const { query } = req
  const { token } = query

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Server Error'
        })
      }
      return res.send({
        success: true,
        message: 'You are logged out'
      })
    }
  )
})

//Verifizierung

router.get('/verify', (req, res, next) => {
  const { query } = req
  const { token } = query

  UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Err'
        })
      }
      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session'
        })
      } else {
        return res.send({
          success: true,
          message: 'Good'
        })
      }
    }
  )
})

router.patch('/users/:id', (req, res, next) => {
  User.findAndUpdate(
    { _id: req.params.id },
    { $set: {
        isBookmarked: req.userId
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Server Error'
        })
      }
      return res.send({
        success: true,
        message: 'User updated'
      })
    }
  )  
})



module.exports = router
