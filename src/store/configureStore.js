import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = process.env.NODE_ENV === 'development' ? createLogger() : null
const middleware = []

// for reduc devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let mystore
export function store () {
	return mystore
}

export function configureStore ( ) {
	mystore = createStore (
		rootReducer,
		{},
		composeEnhancers (loggerMiddleware ? applyMiddleware (...middleware, loggerMiddleware) : applyMiddleware (...middleware))
	)
	return mystore
}