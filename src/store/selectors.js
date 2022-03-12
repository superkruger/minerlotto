import { get } from 'lodash'
import { createSelector } from 'reselect'

const socketConnected = state => get(state, 'app.connected', false)
export const socketConnectedSelector = createSelector(socketConnected, s => s)

const socketClient = state => get(state, 'app.client', null)
export const socketClientSelector = createSelector(socketClient, s => s)

const address = state => get(state, 'app.address', null)
export const addressSelector = createSelector(address, s => s)

const mining = state => get(state, 'app.mining', false)
export const miningSelector = createSelector(mining, s => s)

const stopped = state => get(state, 'app.stopped', true)
export const stoppedSelector = createSelector(stopped, s => s)

const blockHeight = state => get(state, 'app.blockHeight', 0)
export const blockHeightSelector = createSelector(blockHeight, s => s)

const nonce = state => get(state, 'app.nonce', 0)
export const nonceSelector = createSelector(nonce, s => s)

const extraNonce = state => get(state, 'app.extraNonce', 0)
export const extraNonceSelector = createSelector(extraNonce, s => s)

const solved = state => get(state, 'app.solved', false)
export const solvedSelector = createSelector(solved, s => s)

const problem = state => get(state, 'app.problem', null)
export const problemSelector = createSelector(problem, s => s)

const worker = state => get(state, 'app.worker', null)
export const workerSelector = createSelector(worker, s => s)

const solution = state => get(state, 'app.solution', null)
export const solutionSelector = createSelector(solution, s => s)
