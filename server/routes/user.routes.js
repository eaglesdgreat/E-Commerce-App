import express from 'express'

import userControl from './../controllers/user.controllers'
import authControl from './../controllers/auth.controllers'

const router = express.Router()

router.route('/api/users')
  .get(userControl.list)
  .post(userControl.create)

router.route('/api/users/:userId')
  .get(authControl.requiredSignIn, userControl.read)
  .put(authControl.requiredSignIn, authControl.hasAuthorization, userControl.update)
  .delete(authControl.requiredSignIn, authControl.hasAuthorization, userControl.remove)

router.param('userId', userControl.userById)

export default router
