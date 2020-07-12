import userConstants from './../constants/user.constants'

export const initialState = {
  users: [],
  loading: true,
}
export function userReducer(state = initialState, action) {
  switch (action.type) {
    // All created user reducer
    case userConstants.GET_ALL_REQUEST:
      return { ...state, loading: true }
    case userConstants.GET_ALL_SUCCESS:
      return { ...state, users: action.data, loading: false }
    case userConstants.GET_ALL_FAILURE:
      return { error: action.error }
    default:
      return state
  }
}

export default userReducer
