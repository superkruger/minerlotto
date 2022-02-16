import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

// import WorkerBuilder from './worker/worker-builder';
// import Worker from './worker/hash-worker';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('wss://api.decentravest.com/socket');
// const instance = new WorkerBuilder(Worker);

class App extends Component {
  state = {};

  componentDidMount() {

    // instance.onmessage = (message) => {
    //   if (message) {
    //     console.log("Message from worker", message.data);
    //     client.send(JSON.stringify({"Type": "REQUEST", "Address": "foobar"}))
    //   }
    // };
  }

  componentWillMount() {
    const {
      dispatch
    } = this.props

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(JSON.stringify({"Type": "REQUEST", "Address": "foobar"}))
    };
    client.onmessage = (event) => {
      console.log(event);

      var headerMessage = JSON.parse(event.data)
      console.log('headerMessage', headerMessage)

      var header = JSON.stringify(headerMessage.Header)
      console.log('header', header)

      // instance.postMessage(header)

      wasmWorker(header)

      // wasmWorker("./hash.wasm").then((wasmProxyInstance) => {
      //   wasmProxyInstance.HashHeader(header)
      //       .then((result) => {
      //           console.log("HashHeader result: ", result);
      //       })
      //       .catch((error) => {
      //           console.error(error);
      //       });
      // });
      

    };
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


function wasmWorker(header) {
 
    // Create an object to later interact with 
    const proxy = {};
 
    // Keep track of the messages being sent
    // so we can resolve them correctly
    let id = 0;
    let idPromises = {};
 
    return new Promise((resolve, reject) => {

        console.log("building worker")

        const worker = new Worker('wasm.worker.js');
        worker.postMessage({eventType: "CALL", eventData: header});
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

 

export default App;
