import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {
  Typography,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Paper,
  Button,
  Icon,
  IconButton,
  Divider,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { lightGreen } from '@material-ui/core/colors'
import { Add, Edit } from '@material-ui/icons'

import { listByOwner } from './api.shops'
import { isAuthenticated } from './../auth/auth.helper'
import DeleteShop from './DeleteShop'

const styles = (theme) => ({
  root: {
    padding: '24px',
    backgroundColor: theme.palette.protectedTitle,
    margin: 'auto',
    marginTop: '40px',
    marginBottom: '24px',
    maxWidth: 800,
  },
  title: {
    fontSize: '1.4em',
    textAlign: 'center',
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}`,
    color: lightGreen['900'],
  },
  addButton: {
    float: 'right',
  },
  icon: {
    marginRight: '8px',
    marginBottom: '8px',
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: '8px',
  },
})

class MyShops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shops: [],
      loading: true,
      redirect: false,
    }
    this.loadShop = this.loadShop.bind(this)
    this.removeShop = this.removeShop.bind(this)
  }

  componentDidMount() {
    this.loadShop()
  }

  loadShop() {
    const jwt = isAuthenticated()
    listByOwner({ userId: jwt.user._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        this.setState({ redirect: true })
      } else {
        this.setState({ shops: data, loading: false })
      }
    })
  }

  removeShop(shop) {
    const updateShops = this.state.shops
    const index = updateShops.indexOf(shop)
    updateShops.splice(index, 1)
    this.setState(() => ({ shops: updateShops }))
  }

  render() {
    const { classes } = this.props
    const { loading, shops, redirect } = this.state
    if (redirect) {
      return (<Redirect to="/signin" />)
    }
    if (loading) {
      return (
        <Typography component="p">
          loading....
        </Typography>
      )
    }
    return (
      <div>
        <Paper elevation={5} className={classes.root}>
          <Typography type="title" component="h1" className={classes.title}>
            Your Shops
            <span className={classes.addButton}>
              <Link to="/seller/shops/new">
                <Button color="primary" variant="contained">
                  <Icon className={classes.icon}><Add /></Icon>
                  New Shop
                </Button>
              </Link>
            </span>
          </Typography>
          <List dense>
            {shops.map((shop) => {
              return (
                <span key={shop._id}>
                  <ListItem button={true}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} src={shop.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={shop.name} secondary={shop.description} />
                    {isAuthenticated().user && isAuthenticated().user._id === shop.owner._id && (
                      <ListItemSecondaryAction>
                        <Link to={`/seller/shops/edit/${shop._id}`}>
                          <IconButton aria-label="Edit" color="secondary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <DeleteShop shop={shop} onRemove={this.removeShop} />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                  <Divider />
                </span>
              )
            })}
          </List>
        </Paper>
      </div>
    )
  }
}

MyShops.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyShops)
