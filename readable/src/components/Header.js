import React, {Component} from 'react'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'

class Header extends Component {
    render () {
        return (
          <Headroom>
            <Link to="/">
              <div className="header">
                <h1>Readable</h1>
              </div>
            </Link>
          </Headroom>
        )
    }
}

export default Header