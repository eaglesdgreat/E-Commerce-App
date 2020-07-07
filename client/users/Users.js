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
import { connect } from 'react-redux'

import userActions from './../actions/user.actions'

const styles = (theme) => ({
  root: {
    maxWidth: 800,
    padding: `${theme.spacing(10)}px`,
    backgroundColor: yellow['700'],
    margin: `auto`,
    marginTop: `${theme.spacing(5)}px`,
    marginBottom: `${theme.spacing(3)}px`,
  },
  title: {
    textAlign: 'center',
    fontSize: '1.2em',
    margin: `${theme.spacing(1)}px ${theme.spacing(0)}px ${theme.spacing(1)}px ${theme.spacing(7)}px`,
    color: theme.palette.openTitle,
  },
  name: {
    color: grey['900'],
  },
})

class Users extends Component {
  componentDidMount() {
    this.props.listUsers()
  }

  render() {
    const { classes, users, loading } = this.props
    // const { users, loading } = this.state
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

function mapStateToProps(state) {
  const { users, loading } = state
  return { users, loading }
}

const actionCreator = {
  listUsers: userActions.listUsers,
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  // users: PropTypes.array.isRequired,
  // loading: PropTypes.bool.isRequired,
}

const ReduxUsers = connect(mapStateToProps, actionCreator)(Users)
export default withStyles(styles)(ReduxUsers)
