
import { 
	appLoaded
} from './actions.js'
import { ETHER_ADDRESS, tokensToWei, etherToWei } from '../helpers'

export const loadApp = (dispatch) => {
	dispatch(appLoaded())
}

export const addressEntered = async (address, dispatch) => {
	dispatch(addressEntered(address))
}

export const headerReceived = async (header, dispatch) => {
	dispatch(headerReceived(header))
}

export const miningFinished = async (dispatch) => {
	dispatch(miningFinished())
}

