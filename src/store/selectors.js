import { get } from 'lodash'
import { createSelector } from 'reselect'

const socketConnected = state => get(state, 'app.connected', false)
export const socketConnectedSelector = createSelector(socketConnected, s => s)

const socketClient = state => get(state, 'app.client', null)
export const socketClientSelector = createSelector(socketClient, s => s)

const appLoaded = state => get(state, 'app.loaded', false)
export const appLoadedSelector = createSelector(appLoaded, s => s)

const isWaiting = state => get(state, 'app.waiting', false)
export const isWaitingSelector = createSelector(isWaiting, s => s)

const address = state => get(state, 'app.address', null)
export const addressSelector = createSelector(address, s => s)

const isMining = state => get(state, 'app.mining', false)
export const isMiningSelector = createSelector(isMining, s => s)

const header = state => get(state, 'app.header', null)
export const headerSelector = createSelector(header, s => s)
