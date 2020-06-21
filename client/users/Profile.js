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

import { read } from './api.users'
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
    marginLeft: `${theme.spacing(5)}px`,
    // marginTop: `${theme.spacing(20)}px`,
  },
})

class Profile extends Component {
  constructor(props) {
    super(props)
    // let user
    // if (__isBrowser__) {
    //   user = window.__INITIAL_STATE__
    //   delete window.__INITIAL_STATE__
    // } else {
    //   user = this.props.staticContext.data
    // }
    this.state = {
      usered: '',
      redirecToSignin: false,
      loading: true,
    }
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
    read({ userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        this.setState({ redirecToSignin: true })
      } else {
        this.setState({ usered: data, loading: false })
      }
    })
  }

  render() {
    const {
      usered,
      redirecToSignin,
      loading,
    } = this.state
    const { classes } = this.props
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
            {usered.name}
            -Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={usered.name} secondary={usered.email} />
              {isAuthenticated().user && isAuthenticated().user._id === usered._id && (
                <ListItemSecondaryAction>
                  <Link to={`/user/edit/${usered._id}`}>
                    <IconButton className={classes.link}>
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={usered._id} />
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={usered.about} secondary={`Joined: ${(new Date(usered.created).toDateString())}`} />
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
