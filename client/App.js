import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom/'

import HomePage from './core/Home'
import ListUsers from './users/Users'
import SignUp from './users/SignUp'
import SignIn from './auth/SignIn'
import Profile from './users/Profile'
import PrivateRoute from './auth/PrivateRoute'
import EditProfile from './users/EditProfile'
import NavBar from './core/Menu'
import theme from './../styles/theme'
// import routes from './routes'

class App extends Component {
  // componentDidMount() {
  //   const jssStyle = document.getElementById('jss-server-side')
  //   if (jssStyle && jssStyle.parentNode) {
  //     jssStyle.parentNode.removeChild(jssStyle)
  //   }
  // }
  
  render() {
    return (
      <div>
        <NavBar />
        <MuiThemeProvider theme={theme}>
          <Switch>
            {/* {routes.map(({ path, exact, component: C, ...rest }) => {
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => {
                  <C {...props} {...rest} />
                }}
              />
            })} */}
            <Route exact path="/" component={HomePage} />
            <Route path="/users" component={ListUsers} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
            <Route path="/user/:userId" component={Profile} />
          </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default hot(module)(App)
