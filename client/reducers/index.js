import { combineReducers } from 'redux'

import { initialState as usersInitialState, userReducer } from './user.reducers'
import { initialState as signUpInitialState, registrationReducer } from './registration.user.reducer'
import { initialState as oneUserInitialState, getOneReducer } from './get.user.reducers'
import { initialState as updateUserInitaialState, updateOneReducer } from './update.user.reducer'

export const rootReducer = combineReducers({
  signUp: registrationReducer,
  listUsers: userReducer,
  oneUser: getOneReducer,
  updatesUser: updateOneReducer,
})

export const initialState = {
  signUp: signUpInitialState,
  listUsers: usersInitialState,
  oneUser: oneUserInitialState,
  updatesUser: updateUserInitaialState,
}

export default rootReducer
