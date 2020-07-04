import React, { Component } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Button,
  Icon,
} from '@material-ui/core'
import { CloudUpload, Error } from '@material-ui/icons'
import { Redirect, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors/'
import PropTypes from 'prop-types'

import { isAuthenticated } from './../auth/auth.helper'
import { create } from './api.shops'

const styles = (theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'center',
    marginTop: `${theme.spacing(5)}px`,
    paddingBottom: `${theme.spacing(2)}px`,
    backgroundColor: lightGreen['500'],
  },
  title: {
    marginTop: `${theme.spacing(2)}px`,
    color: blueGrey['700'],
    fontSize: '1.2em',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
  form: {
    width: '100%',
    marginTop: '16px',
  },
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    width: 400,
  },
  error: {
    varticalAlign: 'middle',
  },
  submit: {
    margin: 'auto',
    marginBottom: '16px',
  },
})

class NewShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      logo: '',
      redirect: false,
      error: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    this.shopData = new FormData()
  }

  handleChange(event) {
    const { name } = event.target
    const value = name === 'logo'
      ? event.target.files[0]
      : event.target.value
    this.shopData.set(name, value)
    this.setState({ [name]: value })
  }

  clickSubmit(e) {
    e.preventDefault()
    const jwt = isAuthenticated()
    create({ userId: jwt.user._id }, { t: jwt.token }, this.shopData).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ error: '', redirect: true })
      }
    })
  }

  render() {
    const { classes } = this.props
    const {
      name,
      description,
      redirect,
      error,
      logo,
    } = this.state
    if (redirect) {
      return (<Redirect to="/seller/shops" />)
    }
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="title" component="h1" className={classes.title}>
            Create A New Shop
          </Typography>
          <CardContent>
            <form className={classes.form} encType="multipart/form-data">
              <input
                accept="image/*"
                name="logo"
                type="file"
                onChange={this.handleChange}
                id="icon-button-file"
                className={classes.input}
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="secondary" component="span">
                  Upload Logo
                  <CloudUpload />
                </Button>
              </label>
              <span className={classes.filename}>{logo ? logo.name : ''}</span>
              <br />
              <TextField
                name="name"
                label="Name"
                onChange={this.handleChange}
                value={name}
                required
                autoFocus
                autoComplete="text"
                className={classes.textField}
                fullWidth
                margin="normal"
                variant="standard"
              />
              <br />
              <TextField
                name="description"
                label="Shop Description"
                onChange={this.handleChange}
                value={description}
                required
                autoComplete="text"
                className={classes.textField}
                fullWidth
                margin="normal"
                variant="standard"
                multiline
                row="2"
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
            <Button className={classes.submit} variant="contained" color="secondary" onClick={this.clickSubmit}>
              Submit
            </Button>
            <Link to="/seller/shops" className={classes.submit}>
              <Button varaint="conatined" color="primary">
                Cancle
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}

NewShop.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewShop)
