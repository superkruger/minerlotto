import React, { Component } from "react";
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import MiningWorker from "./MiningWorker"

import { 
  appLoadedSelector, 
  isWaitingSelector,
  addressSelector,
  problemSelector
} from '../store/selectors'

import { 
  socketConnected,
  appLoaded,
  addressEntered,
  problemReceived,
  miningStarted,
  miningFinished,
  solutionVerified
} from '../store/actions'


class MiningController extends Component {
  state = {};

  render() {
    const {
      appLoaded,
      isWaiting,
      address,
      header,
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
    appLoaded: appLoadedSelector(state),
    isWaiting: isWaitingSelector(state),
    address: addressSelector(state),
    problem: problemSelector(state)
  }
}

export default connect(mapStateToProps)(MiningController);