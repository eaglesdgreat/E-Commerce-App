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
import { teal, pink } from '@material-ui/core/colors/'

import { isAuthenticated, logout } from './../auth/auth.helper'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: teal['600'] }
  }
  return { color: pink['400'] }
}

const Menu = withRouter(({ history }) => (
  <div>
    <AppBar position="fixed">
      <Toolbar>
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
            <Link to={`/user/${isAuthenticated().user._id}`}>
              <Button style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                Profile
              </Button>
            </Link>
            <Button color="inherit" onClick={() => { logout(() => { history.push('/') }) }}>
              LogOut
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
    <Toolbar />
  </div>
))

export default Menu
