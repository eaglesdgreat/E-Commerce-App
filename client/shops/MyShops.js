import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyShops extends Component {
  render() {
    return (
      <div>
        <Link to="/seller/shops/new">
          New Shop
        </Link>
      </div>
    )
  }
}

export default MyShops
