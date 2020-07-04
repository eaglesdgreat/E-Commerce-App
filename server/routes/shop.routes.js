import express from 'express'

import authControl from './../controllers/auth.controllers'
import userControl from './../controllers/user.controllers'
import shopControl from './../controllers/shop.controllers'

const router = express.Router()

router.route('/api/shops')
  .get(shopControl.list)

router.route('/api/shops/by/:userId')
  .post(authControl.requiredSignIn, authControl.hasAuthorization, userControl.isSeller, shopControl.create)
  .get(authControl.requiredSignIn, authControl.hasAuthorization, userControl.isSeller, shopControl.listByOwner)

router.route('/api/shop/:shopId')
  .get(shopControl.read)
  .put(authControl.requiredSignIn, shopControl.isOwner, shopControl.update)
  .delete(authControl.requiredSignIn, shopControl.isOwner, shopControl.remove)

router.param('userId', userControl.userById)

router.param('shopId', shopControl.shopById)

export default router
