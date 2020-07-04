import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  // Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import { teal, common } from '@material-ui/core/colors/'

import { isAuthenticated, logout } from './../auth/auth.helper'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: teal['600'] }
  }
  return { color: common['#000'] }
}

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) {
    return { color: teal['600'] }
  }
  return { color: common['#000'] }
}

const Menu = withRouter(({ history }) => (
  <div>
    <AppBar position="fixed">
      <Toolbar>
        <div>
          <span>
            <Link to="/">
              <IconButton aria-label="Home" style={isActive(history, '/')}>
                <Home />
              </IconButton>
              Online Market
            </Link>
            <Link to="/users">
              <Button style={isActive(history, '/users')}>
                Users
              </Button>
            </Link>
            <Link to="/shops/all">
              <Button style={isActive(history, '/shops/all')}>
                Shops
              </Button>
            </Link>
          </span>
        </div>
        <div style={{ position: 'absolute', right: '10px' }}>
          <span style={{ float: 'right' }}>
            {!isAuthenticated() && (
              <span>
                <Link to="/signin">
                  <Button style={isActive(history, '/signin')}>
                    LogIn
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button style={isActive(history, '/signup')}>
                    SignUp
                  </Button>
                </Link>
              </span>
            )}
            {isAuthenticated() && (
              <span>
                {isAuthenticated().user.seller && (
                  <Link to="/seller/shops">
                    <Button style={isPartActive(history, '/seller/shops')}>
                      MyShops
                    </Button>
                  </Link>
                )}
                <Link to={`/user/${isAuthenticated().user._id}`}>
                  <Button style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                    Profile
                  </Button>
                </Link>
                <Button color="inherit" onClick={() => { logout(() => { history.push('/signin') }) }}>
                  LogOut
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </div>
))

export default Menu
