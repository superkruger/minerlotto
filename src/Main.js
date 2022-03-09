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
  appLoadedSelector, 
  isWaitingSelector,
  addressSelector,
  miningSelector, 
  problemSelector
} from './store/selectors'

import { 
  socketConnected,
  appLoaded,
  addressEntered,
  problemReceived,
  miningStarted,
  miningFinished,
  solutionVerified
} from './store/actions'


import { config } from './Constants'

var socketUrl = config.url.SOCKET_URL
var maintenance = config.maintenance

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
  }

  componentWillMount() {
    const props = this.props
    const {
      dispatch
    } = props

    if (!maintenance) {

      client.onopen = () => {

        dispatch(socketConnected(client))
        console.log('WebSocket Client Connected');
        dispatch(appLoaded());
      };

      client.onmessage = (event) => {
        console.log(event);

        var socketMessage = JSON.parse(event.data)
        console.log('socketMessage', socketMessage)

        var messageType = socketMessage.Type

        switch (messageType) {
          case 'PROBLEM':
          dispatch(problemReceived(socketMessage))
          break

          case 'SOLUTION':
          dispatch(solutionVerified(socketMessage))
          break

          default:
          console.log('unknown socket message received')
        }
        
      };

      client.onclose = () => {
        console.log('Socket closed')
      }
    }
  }

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
        {
          maintenance
          ? maintenanceApp()
          : normalApp()
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

function normalApp() {
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



// function wasmWorker(problem, props) {

//     const {
//       socketClient,
//       dispatch
//     } = props
 
//     let hashResult = {};
//     hashResult['extraNonce'] = problem.ExtraNonce
//     hashResult['blockHeight'] = problem.BlockHeight
//     hashResult['address'] = problem.Address
 
//     return new Promise((resolve, reject) => {

//         let header = JSON.stringify(problem.Header)

//         console.log('Creating worker')
//         const worker = new Worker('wasm.worker.js');
//         console.log('Invoking worker')
//         worker.postMessage({eventType: "CALL", eventData: header, startNonce: 0, endNonce: 5000000, hashResult: hashResult});
//         worker.addEventListener('message', function(event) {
 
//             const { eventType, eventData, eventId } = event.data;
 
//             if (eventType === "RESULT") {
//                 console.log("RESULT", eventData)

//                 if (eventData.solved) {
//                   console.log("Header Problem Solved with nonce", eventData.nonce)
//                   socketClient.send(JSON.stringify({"Type": "SOLVED", "Address": eventData.address, Nonce: eventData.nonce, ExtraNonce: eventData.extraNonce, BlockHeight: eventData.blockHeight}))
//                 } else {
//                   //console.log("Requesting next Header Problem")
//                   //socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": eventData.address, "BlockHeight": eventData.blockHeight, "HashesCompleted": eventData.nonce}))
//                 }

//                 dispatch(miningFinished(eventData.solved, eventData.nonce))

                
//                 return;
//             } else if (eventType === "BUSY") {
//                 console.log("BUSY")
//                 dispatch(miningStarted())
//                 return;
//             } 
//         });
 
//         worker.addEventListener("error", function(error) {
//             reject(error);
//         });
//     })
// }


function mapStateToProps(state) {
  return {
    appLoaded: appLoadedSelector(state),
    isWaiting: isWaitingSelector(state),
    address: addressSelector(state),
    mining: miningSelector(state),
    problem: problemSelector(state)
  }
}

export default connect(mapStateToProps)(Main);