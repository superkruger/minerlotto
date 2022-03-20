import React, { Component } from "react";
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
  Routes,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import TopNav from "./components/TopNav"
import SideNav from "./components/SideNav"
import Content from "./components/Content"
import MiningController from "./components/MiningController"

import { w3cwebsocket as W3CWebSocket } from "websocket";

import { 
  socketConnectedSelector, 
  addressSelector,
  miningSelector, 
  stoppedSelector
} from './store/selectors'

import { 
  socketConnected,
  socketDisconnected,
  addressEntered,
  problemReceived,
  miningStarted,
  miningFinished,
  solutionVerified,
  winnersReceived
} from './store/actions'


import { CONFIG, LOG } from './Constants'

var socketUrl = CONFIG.url.SOCKET_URL
var maintenance = CONFIG.maintenance

let client 

if (!maintenance) {
  client = new W3CWebSocket(socketUrl);
}


class Main extends Component {
  state = {};

  componentDidMount() {
    const {
      dispatch
    } = this.props

    LOG("maxNonce", CONFIG.maxNonce)
  }

  componentWillMount() {
    const props = this.props
    const {
      dispatch
    } = props

    if (!maintenance) {

      client.onopen = () => {

        dispatch(socketConnected(client))
        LOG('WebSocket Client Connected');
      };

      client.onmessage = (event) => {
        LOG(event);

        var socketMessage = JSON.parse(event.data)
        LOG('socketMessage', socketMessage)

        var messageType = socketMessage.Type

        switch (messageType) {
          case 'PROBLEM':
          dispatch(problemReceived(socketMessage))
          break

          case 'SOLUTION':
          dispatch(solutionVerified(socketMessage))
          break

          case 'WINNERS':
          dispatch(winnersReceived(socketMessage))
          break

          default:
          LOG('unknown socket message received')
        }
        
      };

      client.onclose = () => {
        LOG('Socket closed')
        dispatch(socketDisconnected())
      }
    }
  }

  render() {
    const {
      address,
      header,
      dispatch
    } = this.props

    return (
      <div>
        {
          maintenance
          ? maintenanceApp()
          : normalApp(this.props)
        }
      </div>
    );
  }
}

function maintenanceApp() {
  return (
    <div>
      <img src="minerlotto_logo.png" alt="minerlotto" className="center maintenance_img"/>
      <div className="center"><h3>Coming soon...</h3></div>
    </div>
  )
}

function normalApp(props) {
  const {
      stopped
    } = props

  return (
    <HashRouter>
      <div>
        <TopNav/>
        <div>
          <Content />
          <MiningController />
        </div>
      </div>
    </HashRouter>
  )
}


function mapStateToProps(state) {
  return {
    socketConnected: socketConnectedSelector(state),
    address: addressSelector(state),
    mining: miningSelector(state),
    stopped: stoppedSelector(state)
  }
}

export default connect(mapStateToProps)(Main);