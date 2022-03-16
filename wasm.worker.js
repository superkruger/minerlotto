
// Polyfill instantiateStreaming for browsers missing it
if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const source = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(source, importObject);
    };
}

let lastresult

function HashResult(solved, nonce) {
  //console.log("HashResult is", solved, nonce)

  lastresult['solved'] = solved
  lastresult['nonce'] = nonce
}
 
function GoSleep(sleepTime) {
    //console.log('GoSleep', sleepTime)
    //sleepWrapper(sleepTime)
    //console.log('GoSleep done')
    //return sleepTime * 3

    return sleep(sleepTime)
}

async function sleepWrapper(sleepTime) {
    await sleep(sleepTime)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle incoming messages
self.addEventListener('message', function(event) {
 
    const { eventType, eventData, eventId, hashResult, startNonce, endNonce, sliderValue } = event.data;

    lastresult = hashResult

    importScripts('./wasm_exec.js');
    const go = new Go();
    
    if (eventType === "CALL") {

        //console.log('calling wasm')

        WebAssembly.instantiateStreaming(fetch("./hash.wasm"), go.importObject).then(async (instantiatedModule) => {

            self.postMessage({
                eventType: "BUSY",
            });

            go.run(instantiatedModule.instance, [eventData, startNonce, endNonce, sliderValue])

            // Send back result message to main thread
            self.postMessage({
                eventType: "RESULT",
                eventData: lastresult,
            });
        });
    }
 
}, false);

