import { combineReducers } from 'redux'

function app (state = {}, action) {
	let index
	let data
	switch (action.type) {
		case 'SOCKET_CONNECTED':
			return {...state, connected: true, client: action.client}
		case 'ADDRESS_ENTERED':
			return {...state, stopped: false, address: action.address}
		case 'PROBLEM_RECEIVED':
			return {...state, mining: false, problem: {problem: action.problem, solved: false, startNonce: 0, endNonce: 1000000}}
		case 'WORKER_CREATED':
			return {...state, worker: action.worker}
		case 'MINING_STARTED':
			return {...state, mining: true}
		case 'MINING_FINISHED':
			let problem = state.problem
			problem.solved = action.solved
			problem.startNonce = action.nonce
			problem.endNonce = action.nextEndNonce

			return {...state, mining: false, solved: action.solved, nonce: action.nonce, extraNonce: action.extraNonce, 
				blockHeight: action.blockHeight, worker: null, problem: problem}
		case 'MINING_STOPPED':
			return {...state, mining: false, stopped: true}
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