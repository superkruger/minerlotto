import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  appLoadedSelector
} from '../store/selectors'

class SideNav extends Component {

  render() {
    const {
      dispatch
    } = this.props

    return (
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-light small" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
              <div className="nav">
                Nav
              </div>
          </div>
          <div className="card bg-light text-dark">
            <div className="card-header">
              Menu
            </div>
            <div className="card-body">
                Card
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    appLoaded: appLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(SideNav)
