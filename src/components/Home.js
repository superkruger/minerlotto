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
  appLoadedSelector,
  socketClientSelector, 
  isWaitingSelector,
  addressSelector,
  isMiningSelector, 
  headerSelector
} from '../store/selectors'

import {
  enterAddress
} from '../store/interactions'

import { 
  appLoaded,
  addressEntered,
  headerReceived,
  miningStarted,
  miningFinished
} from '../store/actions'
 
class Home extends Component {
  render() {
    const {
      appLoaded
    } = this.props

    return (
      <div>
        {
          appLoaded
          ? walletForm (this.props)
          : connecting()
        }
      </div>
    );
  }
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
    appLoaded: appLoadedSelector(state),
    socketClient: socketClientSelector(state),
    isWaiting: isWaitingSelector(state),
    address: addressSelector(state),
    isMining: isMiningSelector(state),
    header: headerSelector(state)
  }
}
export default connect(mapStateToProps)(Home);