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

import { w3cwebsocket as W3CWebSocket } from "websocket";

import { 
  appLoadedSelector, 
  isWaitingSelector,
  addressSelector,
  isMiningSelector, 
  headerProblemSelector
} from './store/selectors'

import { 
  socketConnected,
  appLoaded,
  addressEntered,
  headerProblemReceived,
  miningStarted,
  miningFinished,
  solutionVerified
} from './store/actions'


import { config } from './Constants'

var socketUrl = config.url.SOCKET_URL
 
const client = new W3CWebSocket(socketUrl);

class Main extends Component {
  state = {};

  componentDidMount() {
    const {
      dispatch
    } = this.props
  }

  componentWillMount() {
    const props = this.props
    const {
      dispatch
    } = props

    client.onopen = () => {

      dispatch(socketConnected(client))
      console.log('WebSocket Client Connected');
      dispatch(appLoaded());
    };
    client.onmessage = (event) => {
      console.log(event);

      var socketMessage = JSON.parse(event.data)
      console.log('socketMessage', socketMessage)
      // dispatch(headerReceived(headerMessage))

      var messageType = socketMessage.Type

      switch (messageType) {
        case 'PROBLEM':
        dispatch(headerProblemReceived(socketMessage))
        var headerProblem = JSON.stringify(socketMessage)
        console.log('headerProblem', headerProblem)
        wasmWorker(headerProblem, props)
        break

        case 'SOLUTION':
        dispatch(solutionVerified(socketMessage))
        break

        default:
        console.log('unknown socket message received')
      }
      
    };
  }

  render() {
    const {
      appLoaded,
      isWaiting,
      address,
      isMining,
      header,
      dispatch
    } = this.props

    return (
      <HashRouter>
        <div>
          <TopNav/>
          <div>
            <Content />
          </div>
        </div>
      </HashRouter>
    );
  }
}

function wasmWorker(headerProblem, props) {

    const {
      address,
      dispatch
    } = props
 
    let hashResult = {};
    hashResult['extraNonce'] = headerProblem.ExtraNonce
    hashResult['blockHeight'] = headerProblem.BlockHeight
 
    return new Promise((resolve, reject) => {

        console.log("building worker")

        const worker = new Worker('wasm.worker.js');
        worker.postMessage({eventType: "CALL", eventData: headerProblem.Header, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                console.log("RESULT", eventData)

                if (eventData.solved) {
                  console.log("Header Problem Solved with nonce", eventData.nonce)
                  client.send(JSON.stringify({"Type": "SOLVED", "Address": address, Nonce: eventData.nonce, ExtraNonce: eventData.extraNonce, BlockHeight: eventData.blockHeight}))
                } else {
                  console.log("Requesting next Header Problem")
                  client.send(JSON.stringify({"Type": "REQUEST", "Address": address}))
                }

                dispatch(miningFinished(eventData.solved, eventData.nonce))

                
                return;
            } else if (eventType === "BUSY") {
                console.log("BUSY")
                dispatch(miningStarted())
                return;
            } 
        });
 
        worker.addEventListener("error", function(error) {
            reject(error);
        });
    })
}

function mapStateToProps(state) {
  return {
    appLoaded: appLoadedSelector(state),
    isWaiting: isWaitingSelector(state),
    address: addressSelector(state),
    isMining: isMiningSelector(state),
    headerProblem: headerProblemSelector(state)
  }
}

export default connect(mapStateToProps)(Main);