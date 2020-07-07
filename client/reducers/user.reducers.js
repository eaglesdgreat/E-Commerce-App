import userConstants from './../constants/user.constants'

const initialState = {
  users: [],
  loading: true,
}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
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
