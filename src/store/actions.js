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

export function headerReceived(header) {
	return {
		type: 'HEADER_RECEIVED',
		header
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