import userConstants from '../constants/user.constants'
import {
  list,
  create,
  read,
  update,
} from './../users/api.users'
import { updateUser } from './../auth/auth.helper'

function listUsers() {
  function request() { return { type: userConstants.GET_ALL_REQUEST } }
  function success(data) { return { type: userConstants.GET_ALL_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_ALL_FAILURE, error } }

  return (dispatch) => {
    dispatch(request())
    list().then((data) => { dispatch(success(data)) }, (error) => { dispatch(failure(error)) })
  }
}

function registration(user) {
  function success(data) { return { type: userConstants.REGISTER_USER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.REGISTER_USER_FAILURE, error } }

  return (dispatch) => {
    create(user).then((data) => {
      if (data.error) {
        return dispatch(failure(data.error))
      }
      return dispatch(success(data))
    })
  }
}

function beforeReg(open) {
  function request() { return { type: userConstants.REGISTER_USER_REQUEST } }
  function close(data) { return { type: userConstants.REGISTER_USER_CLOSE, data } }

  return (dispatch) => {
    if (open === false) {
      dispatch(close(open))
    } else {
      dispatch(request())
    }
  }
}

function getUser(userId, jwt) {
  function request() { return { type: userConstants.GET_USER_REQUEST } }
  function success(data) { return { type: userConstants.GET_USER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }

  return (dispatch) => {
    dispatch(request())
    read({ userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        return dispatch(failure(data.error))
      }
      return dispatch(success(data))
    })
  }
}

function updatedUser(userId, jwt, user) {
  function getSuccess(data) { return { type: userConstants.GET_DATA_SUCCESS, data } }
  function getFailure(error) { return { type: userConstants.GET_DATA_FAILURE, error } }
  function updateSuccess(data) { return { type: userConstants.UPDATE_DATA_SUCCESS, data } }
  function updateFailure(error) { return { type: userConstants.UPDATE_DATA_FAILURE, error } }

  return (dispatch) => {
    if (user === null) {
      read({ userId }, { t: jwt.token }).then((data) => {
        if (data.error) {
          return dispatch(getFailure(data.error))
        }
        return dispatch(getSuccess(data))
      })
    } else {
      update({ userId }, { t: jwt.token }, user).then((data) => {
        if (data.error) {
          return dispatch(updateFailure(data.error))
        }
        return updateUser(data, () => {
          return dispatch(updateSuccess(data))
        })
      })
    }
  }
}

const userActions = {
  listUsers,
  registration,
  beforeReg,
  getUser,
  updatedUser,
}

export default userActions
