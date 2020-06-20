import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardContent, CardMedia } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { lightBlue, grey } from '@material-ui/core/colors'

import SeaShell from './../assets/images/seashell.jpg'

const styles = (theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: `${theme.spacing(5)}px`,
    backgroundColor: lightBlue['500'],
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(3)}px ${theme.spacing(2.5)}px`,
    color: grey['900'],
    marginLeft: `${theme.spacing(40)}px`,
  },
  media: {
    minHeight: 400,
  },
})

class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="headline" component="h1" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} title="Unicorn Shell" image={SeaShell} />
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the Online Market Home Page click on sign up to register
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
