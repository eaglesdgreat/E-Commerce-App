import React, { Component } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  Button,
  IconButton,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Delete } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { remove } from './api.users'
import { isAuthenticated, logout } from '../auth/auth.helper'

const styles = (theme) => ({
  delet: {
    marginLeft: `${theme.spacing(5)}px`,
    marginBottom: `${theme.spacing(3)}px`,
  },
})

class DeleteUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToHome: false,
      open: false,
    }
    this.clickButton = this.clickButton.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  // This method open the dialog box when the user click the delete button in the Profile component
  clickButton() {
    this.setState({ open: true })
  }

  // This method close the dialog box when the cancel button is clicked
  handleRequestClose() {
    this.setState({ open: false })
  }

  // This method is used to delete the acount by calling the remove method
  // when the user click the confirm button
  deleteAccount() {
    const jwt = isAuthenticated()
    // const { userId } = this.props.match.params
    remove({ userId: this.props.userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        logout(() => {
          console.log('jwt deleted')
        })
        this.setState({ redirectToHome: true })
      }
    })
  }

  render() {
    const { redirectToHome, open } = this.state
    const { classes } = this.props
    if (redirectToHome) {
      return (<Redirect to="/" />)
    }
    return (
      <div>
        <IconButton aria-label="Delete" onClick={this.clickButton} className={classes.delet}>
          <Delete />
        </IconButton>
        <Dialog open={open} onClose={this.handleRequestClose}>
          <DialogTitle>
            Delete Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">Cancle</Button>
            <Button onClick={this.deleteAccount} color="inherit" autoFocus="autoFocus">Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DeleteUser)
