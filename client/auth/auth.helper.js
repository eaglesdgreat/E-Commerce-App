import _ from 'lodash'

import { signout } from './api.auth'

// Save credentials on successful sign-in using sessionStorage.setItem
function authenticate(jwt, next) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt))
  }
  next()
}

// Retrive credentials if signed-in already, using sessionStorage.getItem
function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false
  }
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'))
  }
  return false
}

// Delet credentials on sign-out using sessionStorage.removeItem
function logout(next) {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt')
    signout().then(() => {
      document.cookie = 't=; expires=Mon, 01 Jan 1970 00:00:00 UTC; path=/;'
    })
  }
  next()
  // signout of cookie below if cookie was your prefer method of authentication
}

// Used to update the user auth service stored in sessionStorage
// to check if the user is a seller or not
function updateUser(user, next) {
  const data = { seller: user.seller }
  const auth = isAuthenticated()
  auth.user = _.extend(auth.user, data)
  sessionStorage.setItem('jwt', JSON.stringify(auth))
  next()
}

export {
  authenticate,
  isAuthenticated,
  logout,
  updateUser,
}
