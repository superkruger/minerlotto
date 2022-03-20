import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap'
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
      <Container>
        <Row>
          <Col sm={12}>
            <a href="/"><img src="minerlotto_logo.png" alt="minerlotto" className="logo_img"/></a>
            <span className="logo_heading">Bitcoin Miner Lotto</span>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <ul className="header">
              <li><NavLink to="/">Lottery</NavLink></li>
              <li><NavLink to="/faq">FAQ</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><NavLink to="/winners">Winners</NavLink></li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(TopNav)
