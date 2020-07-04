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
import NewShop from './shops/NewShop'
import MyShops from './shops/MyShops'
import Shops from './shops/Shops'
import Shop from './shops/Shop'
import EditShop from './shops/EditShop'
// import { list, read } from './users/api.users'

class MainRoutes extends Component {
  componentDidMount() {
    // Removes the server-side injected CSS when React component mounts
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

          <Route path="/shops/all" component={Shops} />
          <Route path="/shops/:shopId" component={Shop} />

          <PrivateRoute path="/seller/shops/new" component={NewShop} />
          <PrivateRoute path="/seller/shops/edit/:shopId" component={EditShop} />
          <PrivateRoute path="/seller/shops" component={MyShops} />
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
