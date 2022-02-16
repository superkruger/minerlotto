import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {
  Routes,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import { w3cwebsocket as W3CWebSocket } from "websocket";

import { 
  appLoadedSelector, 
  isWaitingSelector,
  addressSelector,
  isMiningSelector, 
  headerSelector
} from './store/selectors'

import { 
  appLoaded,
  addressEntered,
  headerReceived,
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
    const {
      dispatch
    } = this.props

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      dispatch(appLoaded());

      client.send(JSON.stringify({"Type": "REQUEST", "Address": "foobar"}))
    };
    client.onmessage = (event) => {
      console.log(event);

      var headerMessage = JSON.parse(event.data)
      console.log('headerMessage', headerMessage)
      dispatch(headerReceived(headerMessage))

      var header = JSON.stringify(headerMessage.Header)
      console.log('header', header)
      wasmWorker(header)
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
          <h1>Bitcoin Miner Lotto</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
            </Routes>
          </div>
          <div>
            {
            appLoaded 
            ? <div>app loaded</div>
            : <div>app not loaded</div>
            }
            {
            isWaiting 
            ? <div>waiting</div>
            : <div>not waiting</div>
            }
            {
            isMining 
            ? <div>mining</div>
            : <div>not mining</div>
            }
            <MiningButton props={this.props}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

function MiningButton(props) {

  const handleClick = () => startMining(props.props);

  return (
    <Button
      variant="primary"
      onClick={handleClick}
    >
      Start Mining!
    </Button>
  );
}

const startMining = async (props) => {
  const { dispatch } = props

  console.log('Last Result', window.GetHashResult())

  //dispatch(addressEntered('123'))
  //dispatch(headerReceived({"hdr":"fff"}))
  
}

export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

function wasmWorker(header) {
 
    let hashResult = {};
 
    return new Promise((resolve, reject) => {

        console.log("building worker")

        const worker = new Worker('wasm.worker.js');
        worker.postMessage({eventType: "CALL", eventData: header, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                console.log("RESULT", eventData)

                client.send(JSON.stringify({"Type": "REQUEST", "Address": "foobar"}))
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