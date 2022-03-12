import React, { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'

import { 
  socketClientSelector,
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
  addressEntered,
  problemReceived,
  workerCreated,
  miningStarted,
  miningFinished,
  miningStopped,
  solutionVerified
} from '../store/actions'

import {
  processResult
} from '../store/interactions'

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

    if ((prevProps.problem === null && problem !== null)
      || ((prevProps.problem !== null && problem !== null)
        && (prevProps.problem.problem !== problem.problem))) {

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
          if (problem.endNonce === 0) {
            socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": address, "BlockHeight": blockHeight, "HashesCompleted": nonce - problem.startNonce}))
          } else {
            dispatch(workerCreated(wasmWorker(this.props)))
          }
        }
      }
    }
  }

  render() {
    const {
      stopped,
      address,
      header,
      dispatch
    } = this.props

    return (
      <div>
      {
        stopped
        ? <div></div>
        : workerStatus(this.props)
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
    hashResult['extraNonce'] = problem.problem.ExtraNonce
    hashResult['blockHeight'] = problem.problem.BlockHeight
    hashResult['address'] = problem.problem.Address
 
    // return new Promise((resolve, reject) => {

        let header = JSON.stringify(problem.problem.Header)

        console.log('Creating worker')
        const worker = new Worker('wasm.worker.js');

        problem.startTime = new Date()

        worker.postMessage({eventType: "CALL", eventData: header, startNonce: problem.startNonce, endNonce: problem.endNonce, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                console.log("RESULT", eventData)

                processResult(eventData, problem, socketClient, dispatch)


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