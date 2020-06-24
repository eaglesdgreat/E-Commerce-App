import fs from 'fs'
import formidable from 'formidable'
import Logo from './../../client/assets/images/sponge.jpg'

import Shop from './../model/shop.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res) => {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: 'Image not uploaded'
      })
    }
    const shop = new Shop(fields)
    shop.owner = req.profile
    if (files.logo) {
      const data = fs.createReadStream(files.logo.path)
      // fs.copyFileSync(files.logo.path, (__dirname, 'client/assets/shops_images'))
      shop.imageUrl = (__dirname, `client/assets/shops_images/${files.logo.path}`)
      console.log(data)
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.status(200).json(result)
    })
  })
}

const shopById = (req, res, next, id) => {
  Shop.findById({_id: id})
    .exec((err, shop) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
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
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(shops)
  })
}

const logo = (req, res, next) => {
  const pic = req.shop
  if (pic.imageUrl) {
    return res.send(pic.imageUrl)
  }
  next()
}

const defaultLogo = (req, res) => {
  return res.sendFile(__dirname, Logo)
}

export default {
  create,
  logo,
  defaultLogo,
  shopById,
  list,
}
