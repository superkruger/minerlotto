import { combineReducers } from 'redux'

function app (state = {}, action) {
	switch (action.type) {
		case 'APP_LOADED':
			return {...state, loaded: true}
		case 'ADDRESS_ENTERED':
			return {...state, waiting: true, address: action.address}
		case 'HEADER_RECEIVED':
			return {...state, mining: true, waiting: false, header: action.header}
		case 'MINING_FINISHED':
			return {...state, mining: false, waiting: true}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	app
})

export default rootReducer