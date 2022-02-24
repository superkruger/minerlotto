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

export function miningFinished(solved, nonce) {
	return {
		type: 'MINING_FINISHED',
		solved,
		nonce
	}
}

export function solutionVerified(solution) {
	return {
		type: 'SOLUTION_VERIFIED',
		solution
	}
}