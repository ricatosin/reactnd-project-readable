import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigation extends Component {

  render() {
    const {categories} = this.props
    console.log("navigation", categories)
    return (
      <div className="categories">
        <h3>Categories</h3>
        <ol>
          {
            categories.length > 0
            ? categories.map((category) => { return <li key={category.name}><Link to={{pathname: `/${category.path}/`}}>{category.name}</Link></li> })
            : null
          }
        </ol>
      </div>
    );
  }
}

export default Navigation;



