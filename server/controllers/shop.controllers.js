import fs from 'fs'
import formidable from 'formidable'
import path from 'path'
import _ from 'lodash'

import Shop from './../model/shop.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res) => {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: 'Logo not uploaded',
      })
    }

    const shop = new Shop(fields)
    shop.owner = req.profile
    if (files.logo) {
      const oldPath = files.logo.path
      const newPath = path.resolve(__dirname, 'images', files.logo.name)
      const rawData = fs.readFileSync(oldPath)
      fs.writeFileSync(newPath, rawData)
      shop.imageUrl = files.logo.name
    }

    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        })
      }
      res.status(200).json(result)
    })
  })
}

const shopById = (req, res, next, id) => {
  Shop.findById({_id: id})
    .populate('owner', '_id name')
    .exec((err, shop) => {
      if (err || !shop) {
        return res.status(400).json({
          error: 'Shop not found',
        })
      }
      req.shop = shop
      next()
    })
}

const list = (req, res) => {
  Shop.find((err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    return res.status(200).json(shops)
  })
}

const listByOwner = (req, res) => {
  Shop.find({owner: req.profile._id}, (err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    return res.status(200).json(shops)
  }).populate('owner', '_id name')
}

const read = (req, res) => {
  return res.status(200).json(req.shop)
}

const isOwner = ( req, res, next) => {
  const owner = req.shop && req.auth && req.shop.owner._id == req.auth._id
  if (!owner) {
    return res.status(400).json({
      error: 'User not authorized',
    })
  }
  next()
}

const update = (req, res) => {
  const form = new formidable.IncomingForm()
  form.keepExtensions= true
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        error: 'Logo not uploaded',
      })
    }
    let shop = req.shop
    shop = _.extend(shop, fields)
    shop.updated = Date.now()
    if (files.logo) {
      const oldPath = files.logo.path
      const newPath = path.resolve(__dirname, 'images', files.logo.name)
      const rawData = fs.readFileSync(oldPath)
      fs.writeFileSync(newPath, rawData)
      shop.imageUrl = files.logo.name
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        })
      }
      return res.status(200).json(result)
    })
  })
}

const remove = (req, res,) => {
  const shop = req.shop
  shop.remove((err, deleteShop) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
    return res.status(200).json({
      message: `${deleteShop.name} retail store has been deleted`,
    })
  })
}

export default {
  create,
  shopById,
  list,
  listByOwner,
  read,
  isOwner,
  update,
  remove,
}
