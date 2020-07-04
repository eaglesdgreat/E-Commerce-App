import React, { Component } from 'react'
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Icon,
  Avatar,
  Grid,
} from '@material-ui/core'
import { CloudUpload, Error } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { lightGreen, blueGrey } from '@material-ui/core/colors'

import { isAuthenticated } from './../auth/auth.helper'
import { update, read } from './api.shops'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: '30px',
  },
  card: {
    textAlign: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
    backgroundColor: lightGreen['500'],
  },
  title: {
    margin: '16px',
    color: blueGrey['400'],
    fontSize: '1.2em',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
  textField: {
    marginLeft: `${theme.spacing(1)}px`,
    marginRight: `${theme.spacing(1)}px`,
    width: 400,
  },
  form: {
    width: '100%',
    marginTop: `${theme.spacing(2)}px`,
  },
  subheading: {
    marginTop: `${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
  error: {
    varticalAlign: 'middle',
  },
  submit: {
    margin: 'auto',
    marginBottom: `${theme.spacing(2)}px`,
  },
})

class EditShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      logo: '',
      owner: '',
      redirect: false,
      error: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    this.shopData = new FormData()
    const { shopId } = this.props.match.params
    read({ shopId }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({
          name: data.name,
          description: data.description,
          logo: data.imageUrl,
          owner: data.owner,
        })
      }
    })
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
    const { shopId } = this.props.match.params
    update({ shopId }, { t: jwt.token }, this.shopData).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ redirect: true })
      }
    })
  }

  render() {
    const { classes } = this.props
    const {
      name,
      description,
      owner,
      redirect,
      error,
      logo,
    } = this.state
    if (redirect) {
      return (<Redirect to="/seller/shops" />)
    }
    return (
      <div className={classes.root}>
        <Grid container spacinng={10}>
          <Grid item xs={6} xm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography type="title" component="h1" className={classes.title}>
                  Edit Shop
                </Typography>
                <br />
                <Avatar src={logo} className={classes.avatar} />
                <br />
                <form className={classes.form} encType="multipart/form-data">
                  <input
                    accept="image/*"
                    type="file"
                    name="logo"
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
                <Typography type="subheading" className={classes.subheading} component="h4">
                  owner:
                  {owner.name}
                </Typography>
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
                <Button onClick={this.clickSubmit} variant="contained" className={classes.submit} color="secondary">
                  Update Shop
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

EditShop.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditShop)
