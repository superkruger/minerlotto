import { combineReducers } from 'redux'

function app (state = {}, action) {
	let index
	let data
	switch (action.type) {
		case 'SOCKET_CONNECTED':
			return {...state, connected: true, client: action.client}
		case 'APP_LOADED':
			return {...state, loaded: true}
		case 'ADDRESS_ENTERED':
			return {...state, waiting: true, stopped: false, address: action.address}
		case 'PROBLEM_RECEIVED':
			return {...state, mining: false, waiting: false, problem: action.problem, solved: false, nonce: 0}
		case 'WORKER_CREATED':
			return {...state, worker: action.worker}
		case 'MINING_STARTED':
			return {...state, mining: true, waiting: false}
		case 'MINING_FINISHED':
			return {...state, mining: false, waiting: true, solved: action.solved, nonce: action.nonce, extraNonce: action.extraNonce, blockHeight: action.blockHeight, worker: null}
		case 'MINING_STOPPED':
			return {...state, mining: false, waiting: false, stopped: true}
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