import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { yellow, grey } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Person, ArrowForward } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { list } from './api.users'

const styles = (theme) => ({
  root: {
    padding: `${theme.spacing(2)}px`,
    backgroundColor: yellow['700'],
    margin: `${theme.spacing(5)}px`,
  },
  title: {
    margin: `${theme.spacing(4)}px ${theme.spacing(0)}px ${theme.spacing(2)}px ${theme.spacing(65)}px`,
    color: theme.palette.openTitle,
  },
  name: {
    color: grey['900'],
  },
})

class Users extends Component {
  constructor(props) {
    super(props)
    // let users
    // if (__isBrowser__) {
    //   users = window.__INITIAL_STATE__
    //   delete window.__INITIAL_STATE__
    // } else {
    //   users = props.staticContext.data
    // }
    this.state = {
      users: '',
      loading: true,
    }
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState(() => ({ users: data, loading: false }))
      }
    })
  }

  render() {
    const { classes } = this.props
    const { users, loading } = this.state
    if (loading) {
      return (
        <Typography component="p">
          loading....
        </Typography>
      )
    }
    return (
      <div>
        <Paper className={classes.root} elevation={10}>
          <Typography type="title" component="h1" className={classes.title}>
            All Available Users
          </Typography>
          <List dense>
            {users.map((item) => {
              return (
                <Link to={`/user/${item._id}`} key={item._id}>
                  <ListItem button={true}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.name} primary={item.name} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </Paper>
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Users)
