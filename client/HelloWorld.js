import React from 'react'
import { hot } from 'react-hot-loader'

class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Eagles!!!</h1>
      </div>
    )
  }
}

export default hot(module)(HelloWorld)
