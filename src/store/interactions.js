
import { 
	addressEntered,
	socketConnected,
	miningFinished
} from './actions.js'

import { config } from '../Constants'

export const enterAddress = async (address, socketClient, dispatch) => {
	dispatch(addressEntered(address))
	socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": address}))
}

export const processResult = async (eventData, problem, socketClient, dispatch) => {

	let elapsedSeconds = 0
	let hashesPerSecond = 0
	let nextNonceAmount = 1000000
	if (problem.startTime !== null) {
		let now = new Date()
		elapsedSeconds =(now.getTime() - problem.startTime.getTime()) / 1000;
		console.log("Elapsed worker seconds", elapsedSeconds, "started at", problem.startTime)

		hashesPerSecond = (eventData.nonce - problem.startNonce) / elapsedSeconds
		console.log("hashesPerSecond", hashesPerSecond)
	}

	let nextEndNonce = 0
	if (config.maxNonce - eventData.nonce > nextNonceAmount) {
		nextEndNonce = eventData.nonce + nextNonceAmount
	} else {
		// ran out of nonces, request new problem
	}


	socketClient.send(JSON.stringify({"Type": "HASHES", "HashesCompleted": eventData.nonce - problem.startNonce}))
	
	dispatch(miningFinished(eventData.solved, eventData.nonce, eventData.extraNonce, eventData.blockHeight, nextEndNonce))

}



