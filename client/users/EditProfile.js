import React, { Component } from 'react'
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Icon,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { lime, cyan } from '@material-ui/core/colors'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Error, Person } from '@material-ui/icons'
import { connect } from 'react-redux'

import userActions from './../actions/user.actions'
import { isAuthenticated } from './../auth/auth.helper'

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    paddingBottom: `${theme.spacing(3)}px`,
    marginTop: `${theme.spacing(2)}px`,
    backgroundColor: lime['300'],
    textAlign: 'center',
  },
  title: {
    color: theme.palette.protectedTitle,
    marginTop: `${theme.spacing(2)}px`,
    marginLeft: `${theme.spacing(5)}px`,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  form: {
    width: '100%',
    marginTop: `${theme.spacing(2)}px`,
  },
  textField: {
    width: 300,
    marginRight: `${theme.spacing(1)}px`,
    marginleft: `${theme.spacing(1)}px`,
  },
  submit: {
    margin: 'auto',
    marginBottom: `${theme.spacing(2)}px`,
    ':hover': {
      color: cyan['200'],
    },
  },
  error: { varticalAlign: 'middle' },
  subheading: {
    marginTop: `${theme.spacing(2)}`,
    color: theme.palette.openTitle,
  },
})

class EditProfile extends Component {
  constructor(props) {
    super(props)
    // let user
    // if (__isBrowser__) {
    //   user = window.__INITIAL_STATE__
    //   delete window.__INITIAL_STATE__
    // } else {
    //   user = this.props.staticContext.user
    // }
    this.state = {
      name: '',
      email: '',
      password: '',
      seller: '',
      about: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props.match.params
    const jwt = isAuthenticated()
    this.props.updatedUser(userId, jwt, null)
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      seller: this.props.user.seller,
      about: this.props.user.about,
    })
  }

  componentWillUnmount() {
    this._currentId = null
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleCheck(event) {
    const { checked, name } = event.target
    this.setState({ [name]: checked })
  }

  clickSubmit(e) {
    e.preventDefault()
    const {
      name,
      email,
      about,
      password,
      seller,
    } = this.state
    const { userId } = this.props.match.params
    this._currentId = userId
    const jwt = isAuthenticated()
    const user = {
      name,
      email,
      about,
      password: password || undefined,
      seller,
    }
    this.props.updatedUser(userId, jwt, user)
  }

  render() {
    const {
      name,
      email,
      about,
      password,
      seller,
    } = this.state
    const {
      classes,
      user,
      redirectToProfile,
      error,
    } = this.props
    if (redirectToProfile) {
      return (<Redirect to={`/user/${user._id}`} />)
    }
    return (
      <div>
        <Card className={classes.card}>
          <Typography className={classes.title} type="headline" component="h1">
            Edit Profile
          </Typography>
          <CardContent>
            <Avatar className={classes.bigAvatar}>
              <Person />
            </Avatar>
            <form className={classes.form}>
              <TextField
                className={classes.textField}
                name="name"
                type="text"
                label="Name"
                value={name}
                onChange={this.handleChange}
                autoComplete="text"
                autoFocus
                variant="standard"
                margin="normal"
              />
              <br />
              <TextField
                className={classes.textField}
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={this.handleChange}
                autoComplete="email"
                variant="standard"
                margin="none"
              />
              <br />
              <TextField
                className={classes.textField}
                name="about"
                type="text"
                label="AboutMe"
                value={about}
                onChange={this.handleChange}
                autoComplete="text"
                multiline
                rows="2"
                variant="standard"
                margin="normal"
              />
              <br />
              <TextField
                className={classes.textField}
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={this.handleChange}
                autoComplete="current-password"
                variant="standard"
                margin="normal"
              />
              <Typography component="h3" type="subheading" className={classes.subheading}>
                Activate Retailer Account
              </Typography>
              <FormControlLabel
                control={(
                  <Switch
                    name="seller"
                    classes={{ checked: classes.checked, bar: classes.bar }}
                    checked={seller}
                    onChange={this.handleCheck}
                  />
                )}
                label={seller ? 'Active' : 'Inactive'}
              />
              <br />
            </form>
            {error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  <Error />
                </Icon>
                {error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button className={classes.submit} onClick={this.clickSubmit} variant="contained" color="secondary">
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

function mapStateToprops(state) {
  const { user, error, redirectToProfile } = state.updatesUser
  return { user, error, redirectToProfile }
}

const actionCreator = {
  updatedUser: userActions.updatedUser,
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const ReduxEditProfile = connect(mapStateToprops, actionCreator)(EditProfile)

export default withStyles(styles)(ReduxEditProfile)
