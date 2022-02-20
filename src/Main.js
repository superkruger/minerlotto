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
  headerSelector
} from './store/selectors'

import { 
  socketConnected,
  appLoaded,
  addressEntered,
  headerReceived,
  miningStarted,
  miningFinished
} from './store/actions'
 
const client = new W3CWebSocket('wss://api.decentravest.com/socket');

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

      //client.send(JSON.stringify({"Type": "REQUEST", "Address": "foobar"}))
    };
    client.onmessage = (event) => {
      console.log(event);

      var headerMessage = JSON.parse(event.data)
      console.log('headerMessage', headerMessage)
      dispatch(headerReceived(headerMessage))

      var header = JSON.stringify(headerMessage.Header)
      console.log('header', header)
      //wasmWorker(header, props)
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

function wasmWorker(header, props) {

    const {
      address,
      dispatch
    } = props
 
    let hashResult = {};
 
    return new Promise((resolve, reject) => {

        console.log("building worker")

        const worker = new Worker('wasm.worker.js');
        worker.postMessage({eventType: "CALL", eventData: header, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                console.log("RESULT", eventData)
                dispatch(miningFinished(eventData.solved, eventData.nonce))

                client.send(JSON.stringify({"Type": "REQUEST", "Address": address}))
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
    header: headerSelector(state)
  }
}

export default connect(mapStateToProps)(Main);