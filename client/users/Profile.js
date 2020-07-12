import React, { Component } from 'react'
import {
  Typography,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Person, Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redirect, Link } from 'react-router-dom'
import { amber } from '@material-ui/core/colors'
import { connect } from 'react-redux'

import userActions from './../actions/user.actions'
import { isAuthenticated } from './../auth/auth.helper'
import DeleteUser from './DeleteUser'

const styles = (theme) => ({
  root: {
    padding: `${theme.spacing(3)}px`,
    maxWidth: 600,
    margin: 'auto',
    marginTop: `${theme.spacing(5)}px`,
    backgroundColor: amber['600'],
  },
  title: {
    marginTop: `${theme.spacing(4)}px`,
    marginLeft: `${theme.spacing(5)}px`,
    color: theme.palette.protectedTitle,
  },
  link: {
    marginLeft: `${theme.spacing(20)}px`,
    // marginTop: `${theme.spacing(20)}px`,
  },
})

class Profile extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props.match.params
    this.init(userId)
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props.match.params
    if (prevProps.match.params.userId !== userId) {
      this.init(userId)
    }
  }

  componentWillUnmount() {
    this._currentId = null
  }

  init(userId) {
    this._currentId = userId
    const jwt = isAuthenticated()
    this.props.getUser(userId, jwt)
  }

  render() {
    const {
      user,
      redirecToSignin,
      loading,
      classes,
    } = this.props
    if (redirecToSignin) {
      return (<Redirect to="/signin" />)
    }
    if (loading) {
      return (<Typography component="p">loading....</Typography>)
    }
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h1" className={classes.title}>
            {user.name}
            -Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                <ListItemSecondaryAction>
                  <Link to={`/user/edit/${user._id}`}>
                    <IconButton className={classes.link}>
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id} />
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={user.about} secondary={`Joined: ${(new Date(user.created).toDateString())}`} />
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, loading, redirecToSignin } = state.oneUser
  return { user, loading, redirecToSignin }
}

const actionCreator = {
  getUser: userActions.getUser,
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const ReduxProfile = connect(mapStateToProps, actionCreator)(Profile)

export default withStyles(styles)(ReduxProfile)
