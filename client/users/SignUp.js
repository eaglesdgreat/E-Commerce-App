import React, { Component } from 'react'
import {
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { yellow, cyan } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { Error, Cancel } from '@material-ui/icons'
import { connect } from 'react-redux'

import userActions from './../actions/user.actions'

const styles = (theme) => ({
  card: {
    maxWidth: 500,
    textAlign: 'center',
    margin: 'auto',
    marginTop: `${theme.spacing(5)}px`,
    paddingBottom: theme.spacing(3),
    backgroundColor: yellow['700'],
  },
  error: {
    varticalAlign: 'middle',
  },
  title: {
    marginTop: `${theme.spacing(2)}px`,
    marginLeft: `${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: `${theme.spacing(1)}px`,
    marginRight: `${theme.spacing(1)}px`,
    width: 300,
  },
  form: {
    width: '100%',
    marginTop: `${theme.spacing(2)}px`,
  },
  submit: {
    margin: 'auto',
    marginBottom: `${theme.spacing(2)}px`,
    ':hover': {
      color: cyan['900'],
    },
  },
})

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: '',
      email: '',
      password: '',
    })
    this.props.beforeReg(null)
  }

  handleRequestClose() {
    this.props.beforeReg(false)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clickSubmit(e) {
    e.preventDefault()
    const { name, email, password } = this.state
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password,
    }
    this.props.registration(user)
  }

  render() {
    const {
      name,
      email,
      password,
    } = this.state
    const {
      classes,
      error,
      open,
    } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} type="headline" component="h1">
              Sign Up Form
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                name="name"
                type="text"
                value={name}
                onChange={this.handleChange}
                required
                className={classes.textField}
                autoFocus
                label="Name"
                autoComplete="text"
                margin="normal"
                variant="outlined"
              />
              <br />
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
                required
                className={classes.textField}
                label="Email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
              <br />
              <TextField
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                required
                className={classes.textField}
                label="Passwrod"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
              <br />
            </form>
            {error && (
              <Typography component="p" color="error">
                <Icon className={classes.error} color="error">
                  <Error />
                </Icon>
                {error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button color="secondary" variant="contained" onClick={this.clickSubmit} className={classes.submit}>
              Submit
            </Button>
          </CardActions>
          <Dialog open={open} onClose={this.handleRequestClose}>
            <DialogTitle>
              <DialogActions>
                <IconButton onClick={this.handleRequestClose}>
                  <Cancel />
                </IconButton>
              </DialogActions>
              Congratulations!!
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You created your account, you can sign in now by clicking on the sign in button
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/signin">
                <Button color="primary" autoFocus="autoFocus" variant="contained">
                  Sign In
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { error, open } = state.signUp
  return { error, open }
}

const actionCreator = {
  registration: userActions.registration,
  beforeReg: userActions.beforeReg,
}

SignUp.propsTypes = {
  classes: PropTypes.object.isRequired,
}

const ReduxSignup = connect(mapStateToProps, actionCreator)(SignUp)

export default withStyles(styles)(ReduxSignup)
