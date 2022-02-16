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

export function miningFinished() {
	return {
		type: 'MINING_FINISHED'
	}
}