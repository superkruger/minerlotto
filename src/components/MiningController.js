import React, { Component } from "react";
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import MiningWorker from "./MiningWorker"




class MiningController extends Component {
  state = {};

  render() {
    const {
      dispatch
    } = this.props

    return (
      <div>
        <MiningWorker />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(MiningController);