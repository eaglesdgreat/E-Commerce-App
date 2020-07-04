import React, { Component } from 'react'
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Button,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { remove } from './api.shops'
import { isAuthenticated } from './../auth/auth.helper'

const styles = (theme) => ({
  title: {
    fontSize: '1.1em',
    textAlign: 'center',
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}`,
    color: theme.palette.protectedTitle,
  },
})

class DeleteShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.clickOpen = this.clickOpen.bind(this)
    this.removeShop = this.removeShop.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  // This method open the dialog box when the auth user
  // click the delete button in the MyShop component
  clickOpen() {
    this.setState({ open: true })
  }

  // This method close the dialog box when the cancel button is clicked
  handleClose() {
    this.setState({ open: false })
  }

  // This method is used to delete the acount by calling the remove method
  // when the user click the confirm button
  removeShop() {
    const jwt = isAuthenticated()
    remove({ shopId: this.props.shop._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ open: false }, () => {
          this.props.onRemove(this.props.shop)
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <span>
        <IconButton onClick={this.clickOpen} color="secondary" aria-label="Delete">
          <Delete />
        </IconButton>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>
            <Typography type="title" className={classes.title}>
              Delete Shop
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click on the confirm button to delete shop
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} varaint="conatined" color="primary">Cancel</Button>
            <Button onClick={this.removeShop} varaint="contained" color="secondary" autoFocus>Confirm</Button>
          </DialogActions>
        </Dialog>
      </span>
    )
  }
}

DeleteShop.propTypes = {
  shop: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default withStyles(styles)(DeleteShop)
