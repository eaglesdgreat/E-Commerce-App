import userConstants from './../constants/user.constants'

export const initialState = {
  error: '',
  redirectToProfile: false,
  user: '',
}

export function updateOneReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_DATA_SUCCESS:
      return { ...state, user: action.data }
    case userConstants.GET_DATA_FAILURE:
      return { ...state, error: action.error }
    case userConstants.UPDATE_DATA_FAILURE:
      return { ...state, error: action.error }
    case userConstants.UPDATE_DATA_SUCCESS:
      return { ...state, redirectToProfile: true }
    default:
      return { ...state }
  }
}

export default updateOneReducer
