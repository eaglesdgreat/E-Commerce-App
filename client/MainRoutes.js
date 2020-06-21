import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom/'

import HomePage from './core/Home'
import ListUsers from './users/Users'
import SignUp from './users/SignUp'
import SignIn from './auth/SignIn'
import Profile from './users/Profile'
import PrivateRoute from './auth/PrivateRoute'
import EditProfile from './users/EditProfile'
import NavBar from './core/Menu'
// import { list, read } from './users/api.users'

class MainRoutes extends Component {
  componentDidMount() {
    const jssStyle = document.getElementById('jss-server-side')
    if (jssStyle && jssStyle.parentNode) {
      jssStyle.parentNode.removeChild(jssStyle)
    }
  }
  
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/users" component={ListUsers} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
        </Switch>
      </div>
    )
  }
}

// const routes = [
//   {
//     path: '/',
//     exact: true,
//     component: HomePage,
//   },
//   {
//     path: '/users',
//     component: ListUsers,
//     fetchInitialData: (path = '') => {
//       list()
//     },
//   },
//   {
//     path: '/signup',
//     component: SignUp,
//   },
//   {
//     path: '/signin',
//     component: SignIn,
//   },
//   // {
//   //   path: '/user/edit/:userId',
//   //   component: EditProfile,
//   // },
//   {
//     path: '/user/:userId',
//     component: Profile,
//     fetchInitialData: (path = '') => {
//       read(path.split('/').pop())
//     },
//     routes: {
//       path: '/user/edit/:userId',
//       component: EditProfile,
//     }
//   },
// ]

export default MainRoutes
