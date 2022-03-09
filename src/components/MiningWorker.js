import React, { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'

import { 
  socketClientSelector,
  appLoadedSelector, 
  isWaitingSelector,
  addressSelector,
  miningSelector,
  stoppedSelector,
  blockHeightSelector,
  nonceSelector,
  extraNonceSelector,
  solvedSelector,
  problemSelector,
  workerSelector
} from '../store/selectors'

import { 
  appLoaded,
  addressEntered,
  problemReceived,
  workerCreated,
  miningStarted,
  miningFinished,
  miningStopped,
  solutionVerified
} from '../store/actions'



class MiningWorker extends Component {
  state = {};


  componentDidUpdate(prevProps, prevState, snapshot) {

    const {
      socketClient,
      mining,
      stopped,
      address,
      blockHeight,
      nonce,
      extraNonce,
      problem,
      solved,
      worker,
      dispatch
    } = this.props

    if (prevProps.problem !== problem && problem !== null) {

        console.log('Problem updated')

        if (worker != null) {
          console.log('worker still running, terminating');
          worker.terminate();
        }


        if (!stopped) {
          dispatch(workerCreated(wasmWorker(this.props)))
        }
    } else if (prevProps.mining !== mining) {
      if (!mining && socketClient !== null) {
        console.log('not mining')

        if (solved) {
          socketClient.send(JSON.stringify({"Type": "SOLVED", "Address": address, Nonce: nonce, ExtraNonce: extraNonce, BlockHeight: blockHeight}))
        }

        if (!stopped) {
          socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": address, "BlockHeight": blockHeight, "HashesCompleted": nonce}))
        }
      }
    }
  }

  render() {
    const {
      appLoaded,
      isWaiting,
      mining,
      address,
      header,
      dispatch
    } = this.props

    return (
      <div>
      {
        mining
        ? workerStatus(this.props)
        : <div></div>
      }
      </div>
  );
  }
}


function workerStatus(props) {

  const {
    socketClient,
    worker,
    dispatch
  } = props

  return (
    <div>
      <h2>Mining!</h2>
      <Form noValidate onSubmit={(event) => {
        event.preventDefault()
        if (worker !== null) {
          socketClient.send(JSON.stringify({"Type": "STOP"}))
          worker.terminate()
        }
        dispatch(miningStopped())
      }}>

        <Button variant="primary" type="submit">
          Stop mining
        </Button>
      </Form>
    </div>
  );
}

function wasmWorker(props) {

    const {
      socketClient,
      problem,
      dispatch
    } = props
 
    let hashResult = {};
    hashResult['extraNonce'] = problem.ExtraNonce
    hashResult['blockHeight'] = problem.BlockHeight
    hashResult['address'] = problem.Address
 
    // return new Promise((resolve, reject) => {

        let header = JSON.stringify(problem.Header)

        console.log('Creating worker')
        const worker = new Worker('wasm.worker.js');
        console.log('Invoking worker')
        worker.postMessage({eventType: "CALL", eventData: header, startNonce: 0, endNonce: 100000000, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                console.log("RESULT", eventData)

                // if (eventData.solved) {
                //   console.log("Header Problem Solved with nonce", eventData.nonce)
                //   socketClient.send(JSON.stringify({"Type": "SOLVED", "Address": eventData.address, Nonce: eventData.nonce, ExtraNonce: eventData.extraNonce, BlockHeight: eventData.blockHeight}))
                // } else {
                //   //console.log("Requesting next Header Problem")
                //   socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": eventData.address, "BlockHeight": eventData.blockHeight, "HashesCompleted": eventData.nonce}))
                // }

                dispatch(miningFinished(eventData.solved, eventData.nonce, eventData.extraNonce, eventData.blockHeight))

            } else if (eventType === "BUSY") {
                console.log("BUSY")
                dispatch(miningStarted())
            }
        });
 
        worker.addEventListener("error", function(error) {
            console.log('wasmWorker error', error);
        });

        return worker
    // })
}

function mapStateToProps(state) {
  return {
    socketClient: socketClientSelector(state),
    appLoaded: appLoadedSelector(state),
    isWaiting: isWaitingSelector(state),
    address: addressSelector(state),
    mining: miningSelector(state),
    stopped: stoppedSelector(state),
    blockHeight: blockHeightSelector(state),
    nonce: nonceSelector(state),
    extraNonce: extraNonceSelector(state),
    solved: solvedSelector(state),
    problem: problemSelector(state),
    worker: workerSelector(state)
  }
}

export default connect(mapStateToProps)(MiningWorker);