import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import App from './App'
import { rootReducer, initialState } from './reducers'

const method = ReactDOM.render ? ReactDOM.render : ReactDOM.hydrate

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
  // (
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // ),
)

method(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
