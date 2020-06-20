import React, { Component } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { green, cyan } from '@material-ui/core/colors'
import { Error } from '@material-ui/icons'

import { signin } from './api.auth'
import { authenticate } from './auth.helper'

const styles = (theme) => ({
  card: {
    maxWidth: 400,
    textAlign: 'center',
    margin: 'auto',
    marginTop: `${theme.spacing(5)}px`,
    paddingBottom: `${theme.spacing(2)}px`,
    backgroundColor: green['400'],
  },
  title: {
    marginTop: `${theme.spacing(2)}px`,
    marginLeft: `${theme.spacing(3)}px`,
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
  error: {
    verticalAlign: 'middle',
  },
  submit: {
    margin: 'auto',
    marginBottom: `${theme.spacing(2)}px`,
    ':hover': {
      color: cyan['900'],
    },
  },
})

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false,
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clickSubmit() {
    const { email, password } = this.state
    const user = {
      email,
      password,
    }
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        authenticate(data, () => {
          this.setState({
            error: '',
            redirectToReferrer: true,
          })
        })
      }
    })
  }

  render() {
    const {
      email,
      password,
      error,
      redirectToReferrer,
    } = this.state
    const { classes } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer) {
      return (<Redirect to={from} />)
    }
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h1" className={classes.title}>
              Sign In Form
            </Typography>
            <form className={classes.form}>
              <TextField
                className={classes.textField}
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                variant="outlined"
                autoFocus
                type="email"
                autoComplete="email"
                label="Email"
                margin="normal"
              />
              <br />
              <TextField
                className={classes.textField}
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                variant="outlined"
                type="password"
                autoComplete="current-password"
                label="Password"
                margin="normal"
              />
              <br />
            </form>
            {error && (
              <Typography color="error" component="p">
                <Icon className={classes.error} color="error">
                  <Error />
                </Icon>
                  {error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button className={classes.submit} color="secondary" onClick={this.clickSubmit} variant="contained">
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn)
