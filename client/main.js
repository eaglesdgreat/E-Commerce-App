import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import userReducer from './reducers/user.reducers'
import App from './App'

const method = ReactDOM.render ? ReactDOM.render : ReactDOM.hydrate

const loggerMiddleware = createLogger()
const store = createStore(
  userReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
)

method(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
