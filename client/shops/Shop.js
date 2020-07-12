import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core'
import { indigo, red, blue } from '@material-ui/core/colors'

import { read } from './api.shops'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: '30px',
  },
  card: {
    backgroundColor: indigo['500'],
    textAlign: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
  },
  title: {
    fontSize: '1.4em',
    color: red['700'],
    margin: '16px',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  subheading: {
    marginTop: '8px',
    color: blue['500'],
  },
  error: {
    varticalAlign: 'middle',
  },
})

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shop: '',
      loading: true,
      error: '',
    }
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    const { shopId } = this.props.match.params
    this.init(shopId)
  }

  componentDidUpdate(prevProps) {
    const { shopId } = this.props.match.params
    if (prevProps.match.params.shopId !== shopId) {
      this.init(shopId)
    }
  }

  componentWillUnmount() {
    this._currentId = null
  }

  init(shopId) {
    this._currentId = shopId
    read({ shopId }).then((data) => {
      if (data.error) {
        this.setState({ loading: false, error: data.error })
      } else {
        this.setState({ loading: false, shop: data })
      }
    })
  }

  render() {
    const { classes } = this.props
    const { loading, shop, error } = this.state
    if (loading) {
      return (<Typography component="p">loading....</Typography>)
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={10}>
          <Grid item xs={4} xm={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography type="heading" component="h1" className={classes.title}>
                  {shop.name}
                </Typography>
                <br />
                <Avatar src={`./dist/images/${shop.imageUrl}`} className={classes.avatar} />
                <br />
                <Typography type="subheading" component="h2" className={classes.subheading}>
                  {shop.description}
                </Typography>
                <br />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {error && (
          <Typography className={classes.error} type="heading" component="h1" color="error">
            {error}
          </Typography>
        )}
      </div>
    )
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Shop)
