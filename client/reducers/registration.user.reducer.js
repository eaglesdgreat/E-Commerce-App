import userConstants from '../constants/user.constants'

export const initialState = { error: '', open: false }

export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_USER_REQUEST:
      return { ...state, error: '', open: false }
    case userConstants.REGISTER_USER_SUCCESS:
      return { ...state, open: true, error: '' }
    case userConstants.REGISTER_USER_FAILURE:
      return { ...state, error: action.error }
    case userConstants.REGISTER_USER_CLOSE:
      return { ...state, open: action.data, error: '' }
    default:
      return state
  }
}

export default registrationReducer
