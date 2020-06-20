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

export {
  authenticate,
  isAuthenticated,
  logout,
}
