import HomePage from './core/Home'
import ListUsers from './users/Users'
import SignUp from './users/SignUp'
import SignIn from './auth/SignIn'
import Profile from './users/Profile'
import EditProfile from './users/EditProfile'
import { list, read } from './users/api.users'

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/users',
    component: ListUsers,
    fetchInitialData: (path = '') => {
      list()
    },
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/user/edit/:userId',
    component: EditProfile,
  },
  {
    path: '/user/:userId',
    component: Profile,
    fetchInitialData: (path = '') => {
      read(path.split('/').pop())
    },
  },
]

export default routes
