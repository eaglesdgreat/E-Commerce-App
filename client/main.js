import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const method = ReactDOM.render ? ReactDOM.render : ReactDOM.hydrate

method(
  <App />,
  document.getElementById("root"),
)
