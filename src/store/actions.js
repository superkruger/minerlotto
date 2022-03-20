export function socketConnected(client) {
	return {
		type: 'SOCKET_CONNECTED',
		client
	}
}

export function socketDisconnected() {
	return {
		type: 'SOCKET_DISCONNECTED'
	}
}

export function addressEntered(address) {
	return {
		type: 'ADDRESS_ENTERED',
		address
	}
}

export function problemReceived(problem) {
	return {
		type: 'PROBLEM_RECEIVED',
		problem
	}
}

export function winnersReceived(winners) {
	return {
		type: 'WINNERS_RECEIVED',
		winners
	}
}

export function workerCreated(worker) {
	return {
		type: 'WORKER_CREATED',
		worker
	}
}

export function minerPoolCreated() {
	return {
		type: 'MINER_POOL_CREATED'
	}
}

export function miningStarted() {
	return {
		type: 'MINING_STARTED'
	}
}

export function miningFinished(solved, nonce, extraNonce, blockHeight, nextEndNonce, hashesPerSecond) {
	return {
		type: 'MINING_FINISHED',
		solved,
		nonce,
		extraNonce,
		blockHeight,
		nextEndNonce,
		hashesPerSecond
	}
}

export function miningStopped() {
	return {
		type: 'MINING_STOPPED'
	}
}

export function solutionVerified(solution) {
	return {
		type: 'SOLUTION_VERIFIED',
		solution
	}
}

export function sliderChanged(value) {
	console.log('sliderChanged', value)
	return {
		type: 'SLIDER_CHANGED',
		value
	}
}