
import { 
	addressEntered,
	socketConnected
} from './actions.js'

export const enterAddress = async (address, socketClient, dispatch) => {
	dispatch(addressEntered(address))
	socketClient.send(JSON.stringify({"Type": "REQUEST", "Address": address}))
}



