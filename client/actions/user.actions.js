import userConstants from '../constants/user.constants'
import { list } from './../users/api.users'

function listUsers() {
  function request() { return { type: userConstants.GET_ALL_REQUEST } }
  function success(data) { return { type: userConstants.GET_ALL_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_ALL_FAILURE, error } }

  return (dispatch) => {
    dispatch(request())
    list().then((data) => { dispatch(success(data)) }, (error) => { dispatch(failure(error)) })
  }
}

const userActions = {
  listUsers,
}

export default userActions
