import userConstants from '../constants/user.constants'

export const initialState = {
  user: '',
  loading: true,
  redirectToSignin: false,
}

export function getOneReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return { ...state, loading: true }
    case userConstants.GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.data }
    case userConstants.GET_USER_FAILURE:
      return { ...state, redirectToSignin: true }
    default:
      return { ...state }
  }
}

export default getOneReducer
