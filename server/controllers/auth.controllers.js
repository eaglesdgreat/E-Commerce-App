import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

import User from './../model/user.model'
import config from './../../config/config'

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User not found',
      })
    }

    // To verify the password from the request body using
    // the authenticate method in the model UserSchema
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({
        error: 'Email and Password do not match',
      })
    }

    // Generate jwt sign using a secret key and user id
    const token = jwt.sign({
      _id: user._id,
    }, config.jwtSecret)

    // Optional if we choose to set the token to a cookie in the response
    // object so its available in the client side if cookie is the
    // prefer for of jwt storage
    res.cookie('t', token, {
      expires: new Date(Date.now() + 9999),
      httpOnly: true,
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  })
}

// The signout function is optional if cookie is not used in the frontend
const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({
    message: 'Signed Out Already',
  })
}

// To check if the incomming request has a
// valid token in the authorization header, and if the token is valid
// it appends the verified user ID in an auth key to the request object
const requiredSignIn = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
})

// To check if the authenticated user is the same as
// user being updated, deleted and has authorization to the account being
// updated or deleted before allowing CRUD to proceed
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
  return authorized
}

export default {
  signin,
  signout,
  requiredSignIn,
  hasAuthorization,
}
