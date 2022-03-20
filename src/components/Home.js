import React, { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';

import Spinner from './Spinner'
import {
  Routes,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import { 
  socketConnectedSelector,
  socketClientSelector, 
  addressSelector,
  miningSelector, 
  stoppedSelector,
  hashesPerSecondSelector,
  workerSelector,
  sliderValueSelector
} from '../store/selectors'

import {
  enterAddress
} from '../store/interactions'

import { 
  socketConnected,
  addressEntered,
  miningStarted,
  miningStopped,
  miningFinished,
  sliderChanged
} from '../store/actions'


import { VALID_ADDRESS } from '../Constants'

 
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { reloadTimer: null }
  }


  componentDidMount() {
    const {
      socketConnected
    } = this.props

    if (!socketConnected) {
      this.setState((state) => {
        return {reloadTimer: setTimeout(() => window.location.href = "/", 30000)}
      });
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      socketConnected
    } = this.props


      if (socketConnected) {
        clearTimeout(this.state.reloadTimer)
      } else if(prevProps.socketConnected) {
        this.setState((state) => {
          return {reloadTimer: setTimeout(() => window.location.href = "/", 30000)}
        });
      }
  }

  render() {
    const {
      socketConnected
    } = this.props

    return (
      <div>
        {
          socketConnected
          ? home (this.props)
          : connecting()
        }
      </div>
    );
  }
}
 
function home(props) {

  const {
    stopped,
    dispatch
  } = props

  return (
    <div>
    {
      stopped
      ? walletForm(props)
      : miningStatus(props)
    }
    </div>
  );
}

function walletForm(props) {

  const {
    socketClient,
    dispatch
  } = props

  return (
      <Container>
        <Row>
          <Col sm={8}>

            <h4>Enter the lottery by submitting your Bitcoin wallet address</h4>
            <Form noValidate onSubmit={(event) => {
              event.preventDefault()
              let walletAddressInput = document.getElementById('walletAddressInput')
              if (walletAddressInput.value.length == 0 || !VALID_ADDRESS.test(walletAddressInput.value)) {
                alert('Invalid wallet address')
              } else {
                enterAddress(walletAddressInput.value, socketClient, dispatch)
              }
            }}>
              <Form.Group className="mb-3" controlId="walletAddressInput">
                <Form.Control autoFocus type="text" placeholder="Your Bitcoin wallet address" />
                <Form.Text className="text-muted">
                  Please ensure it's a valid Bitcoin address!
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Start mining
              </Button>
            </Form>
          </Col>
          <Col sm={4}>
          </Col>
        </Row>
      </Container>
  );
}

function miningStatus(props) {

  const {
    socketClient,
    hashesPerSecond,
    worker,
    sliderValue,
    dispatch
  } = props

  return (
      <Container>
        <Row>
          <Col sm={3}>

            <h4>Mining Lottery running...</h4>
            <Form noValidate onSubmit={(event) => {
              event.preventDefault()
              socketClient.send(JSON.stringify({"Type": "STOP"}))
              if (worker !== null) {
                worker.terminate()
              }
              dispatch(miningStopped())
            }}>

              <Button variant="primary" type="submit">
                Stop mining
              </Button>
            </Form>
          </Col>
          <Col sm={3}>
            
          </Col>
          <Col sm={3}>
            {hashesPerSecond}
          </Col>
        </Row>
      </Container>
  );
}

function connecting() {

  return (
    <Container>
        <Row>
          <Col sm={12}>
            <h4>Not connected. Automatically retrying...</h4>
          </Col>
        </Row>
      </Container>
  )

  // <RangeSlider
  //             value={sliderValue}
  //             onChange={changeEvent => dispatch(sliderChanged(changeEvent.target.value))}
  //             min=1
  //             max=100
  //           />
}


function mapStateToProps(state) {
  return {
    socketConnected: socketConnectedSelector(state),
    socketClient: socketClientSelector(state),
    address: addressSelector(state),
    mining: miningSelector(state),
    stopped: stoppedSelector(state),
    hashesPerSecond: hashesPerSecondSelector(state),
    worker: workerSelector(state),
    sliderValue: sliderValueSelector(state)
  }
}
export default connect(mapStateToProps)(Home);