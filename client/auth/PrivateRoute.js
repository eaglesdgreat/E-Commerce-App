import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './auth.helper'

//  The private route will allow us to declear protected routes
// for the frontend and restrict view access based on auth
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )}
  />
)

export default PrivateRoute
