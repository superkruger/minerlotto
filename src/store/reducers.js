import { combineReducers } from 'redux'

function app (state = {}, action) {
	switch (action.type) {
		case 'SOCKET_CONNECTED':
			return {...state, connected: true, client: action.client}
		case 'APP_LOADED':
			return {...state, loaded: true}
		case 'ADDRESS_ENTERED':
			return {...state, waiting: true, address: action.address}
		case 'HEADER_RECEIVED':
			return {...state, mining: false, waiting: false, header: action.header}
		case 'MINING_STARTED':
			return {...state, mining: true, waiting: false}
		case 'MINING_FINISHED':
			return {...state, mining: false, waiting: true, solved: action.solved, nonce: action.nonce}
		case 'SOLUTION_VERIFIED':
			return {...state, solution: action.solution}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	app
})

export default rootReducer