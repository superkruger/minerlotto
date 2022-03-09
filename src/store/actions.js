export function socketConnected(client) {
	return {
		type: 'SOCKET_CONNECTED',
		client
	}
}

export function appLoaded() {
	return {
		type: 'APP_LOADED'
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

export function miningFinished(solved, nonce, extraNonce, blockHeight) {
	return {
		type: 'MINING_FINISHED',
		solved,
		nonce,
		extraNonce,
		blockHeight
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