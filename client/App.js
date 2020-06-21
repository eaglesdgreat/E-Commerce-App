import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom/'

import theme from './../styles/theme'
import MainRoutes from './MainRoutes'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <MainRoutes />
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    )
  }
}

export default hot(module)(App)
