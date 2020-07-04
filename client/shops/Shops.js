import React, { Component } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  Typography,
  Avatar,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { brown, grey } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { list } from './api.shops'

const styles = (theme) => ({
  root: {
    maxWidth: 800,
    backgroundColor: brown['600'],
    padding: `${theme.spacing(2)}px`,
    margin: 'auto',
    marginTop: `${theme.spacing(5)}px`,
    marginBottom: `${theme.spacing(3)}px`,
  },
  title: {
    textAlign: 'center',
    fontSize: '1.2em',
    margin: `${theme.spacing(3)}px 0px ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  details: {
    padding: '24px',
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px',
  },
  subTitle: {
    color: grey['400'],
  },
})

class Shops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shops: [],
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
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" component="h1" className={classes.title}>
            All Available Shops
          </Typography>
          <List dense>
            {shops.map((shop) => {
              return (
                <Link to={`/shops/${shop._id}`} key={shop._id}>
                  <Divider />
                  <ListItem button={true}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} src={shop.imageUrl} />
                    </ListItemAvatar>
                    <div className={classes.details}>
                      <Typography type="heading" component="h2" color="primary" className={classes.shopTitle}>
                        {shop.name}
                      </Typography>
                      <Typography type="subheading" compnent="h4" className={classes.subTitle}>
                        {shop.description}
                      </Typography>
                    </div>
                  </ListItem>
                  <Divider />
                </Link>
              )
            })}
          </List>
        </Paper>
      </div>
    )
  }
}

Shops.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Shops)
