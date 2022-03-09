import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import {
  NavLink,
} from "react-router-dom";

class TopNav extends Component {

  constructor(props) {    
    super(props)
  }

  render() {
    return (
      <div>
            <h1>Bitcoin Miner Lotto</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(TopNav)
