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
  workerSelector,
  sliderValueSelector
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

import { LOG } from '../Constants'

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

        LOG('Problem updated')

        if (worker != null) {
          LOG('worker still running, terminating');
          worker.terminate();
        }


        if (!stopped) {
          dispatch(workerCreated(wasmWorker(this.props)))
        }
    } else if (prevProps.mining !== mining) {
      if (!mining && socketClient !== null) {
        LOG('not mining')

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
      </div>
  );
  }
}

function wasmWorker(props) {

    const {
      socketClient,
      problem,
      sliderValue,
      dispatch
    } = props
 
    let hashResult = {};
    hashResult['extraNonce'] = problem.problem.ExtraNonce
    hashResult['blockHeight'] = problem.problem.BlockHeight
    hashResult['address'] = problem.problem.Address
 
    // return new Promise((resolve, reject) => {

        let header = JSON.stringify(problem.problem.Header)

        LOG('Creating worker')
        const worker = new Worker('wasm.worker.js');

        problem.startTime = new Date()

        worker.postMessage({eventType: "CALL", eventData: header, startNonce: problem.startNonce, endNonce: problem.endNonce, sliderValue: sliderValue, hashResult: hashResult});
        worker.addEventListener('message', function(event) {
 
            const { eventType, eventData, eventId } = event.data;
 
            if (eventType === "RESULT") {
                LOG("RESULT", eventData)

                processResult(eventData, problem, socketClient, dispatch)


            } else if (eventType === "BUSY") {
                LOG("BUSY")
                dispatch(miningStarted())
            }
        });
 
        worker.addEventListener("error", function(error) {
            LOG('wasmWorker error', error);
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
    worker: workerSelector(state),
    sliderValue: sliderValueSelector(state)
  }
}

export default connect(mapStateToProps)(MiningWorker);