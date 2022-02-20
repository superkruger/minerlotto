import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import {
  NavLink,
} from "react-router-dom";
import {
  isMiningSelector
} from '../store/selectors'

class TopNav extends Component {

  constructor(props) {    
    super(props)
  }

  render() {
    const {
      isMining
    } = this.props

    return (
      <div>
            <Link className="navbar-brand" to='/'>Bitcoin Miner Lotto</Link>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            
            <div className="navbar-nav ml-auto ml-md-0">
                    { isMining
                      ? <span>Busy mining</span>
                      : <span>Not mining</span>
                    }
                    
            </div>
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
    isMining: isMiningSelector(state),
  }
}

export default connect(mapStateToProps)(TopNav)
