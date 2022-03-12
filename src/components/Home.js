import React, { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
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
  stoppedSelector
} from '../store/selectors'

import {
  enterAddress
} from '../store/interactions'

import { 
  socketConnected,
  addressEntered,
  miningStarted,
  miningFinished
} from '../store/actions'
 
class Home extends Component {
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
      : <div/>
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
    <div>
      <h2>Lets Mine!</h2>
      <Form noValidate onSubmit={(event) => {
        event.preventDefault()
        let walletAddressInput = document.getElementById('walletAddressInput')
        if (walletAddressInput.value.length == 0) {
          alert('Enter your wallet address')
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
    </div>
  );
}

function connecting() {
  return (
    <div>
      <h1>Connecting to the server...</h1>
      <Spinner/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    socketConnected: socketConnectedSelector(state),
    socketClient: socketClientSelector(state),
    address: addressSelector(state),
    mining: miningSelector(state),
    stopped: stoppedSelector(state)
  }
}
export default connect(mapStateToProps)(Home);