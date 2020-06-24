import _ from 'lodash'

import User from './../model/user.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res) => {
  const user = new User(req.body)
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    return res.status(200).json({
      message: `Welcome ${result.name} your account is created`,
    })
  })
}

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    return res.status(200).json(users)
  }).select('name email created updated')
}

const userById = (req, res, next, id) => {
  User.findById({ _id: id }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User not found',
      })
    }
    req.profile = user
    next()
    return req.profile
  })
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.status(200).json(req.profile)
}

const update = (req, res) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    return res.status(200).json(user)
  })
}

const remove = (req, res) => {
  const user = req.profile
  user.remove((err, deleteUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    return res.status(200).json({
      message: `${deleteUser.name} your account has been deleted`,
    })
  })
}

const isSeller = (req, res, next) => {
  const seller = req.profile && req.profile.seller
  if (!seller) {
    return res.status(403).json({
      error: 'User not an authorized retailer'
    })
  }
  next()
}

export default {
  create,
  list,
  userById,
  read,
  update,
  remove,
  isSeller,
}
