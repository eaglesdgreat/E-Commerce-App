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
import { Person } from '@material-ui/icons'

import { read, update } from './api.users'
import { isAuthenticated, updateUser } from './../auth/auth.helper'

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
    marginLeft: `${theme.spacing(20)}px`,
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
      error: '',
      about: '',
      seller: false,
      redirectToProfile: false,
      userId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props.match.params
    const jwt = isAuthenticated()
    read({ userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({
          name: data.name,
          email: data.email,
          about: data.about,
          seller: data.seller,
          userId: data._id,
        })
      }
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
    const { checked } = event.target
    this.setState({ seller: checked })
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
    update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        updateUser(data, () => {
          this.setState({ redirectToProfile: true })
        })
      }
    })
  }

  render() {
    const {
      name,
      email,
      password,
      about,
      redirectToProfile,
      error,
      userId,
      seller,
    } = this.state
    const { classes } = this.props
    if (redirectToProfile) {
      return (<Redirect to={`/user/${userId}`} />)
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
                Activate Seller
              </Typography>
              <FormControlLabel
                control={(
                  <Switch
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
                <Icon color="error" className={classes.error} />
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

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditProfile)
