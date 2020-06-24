import React, { Component } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Divider,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { brown } from '@material-ui/core/colors'

import { list } from './api.shops'

const styles = (theme) => ({
  root: {
    backgroundColor: brown['100'],
    
  }
})

class Shops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shops: '',
      loading: true,
    }
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ loading: false, shops: data })
      }
    })
  }

  render() {
    const { classes } = this.props
    const { shops, loading } = this.state
    if (loading) {
      return (
        <Typography component="p">
          loading....
        </Typography>
      )
    }
    return (
      <div>
        <Paper>

        </Paper>
      </div>
    )
  }
}