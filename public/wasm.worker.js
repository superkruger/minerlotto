
// Polyfill instantiateStreaming for browsers missing it
if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const source = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(source, importObject);
    };
}

const MAX_NONCE = Math.pow(2, 32) - 1

let lastresult

function HashResult(solved, nonce) {
  console.log("HashResult is", solved, nonce)

  lastresult['solved'] = solved
  lastresult['nonce'] = nonce
}
 
// Handle incoming messages
self.addEventListener('message', function(event) {
 
    const { eventType, eventData, eventId, hashResult, startNonce, endNonce } = event.data;

    if (endNonce === 0) {
        endNonce = Math.pow(2, 32) - 1
    }

    lastresult = hashResult

    importScripts('./wasm_exec.js');
    const go = new Go();
    
    if (eventType === "CALL") {

        console.log('calling wasm')

        WebAssembly.instantiateStreaming(fetch("./hash.wasm"), go.importObject).then(async (instantiatedModule) => {

            self.postMessage({
                eventType: "BUSY",
            });

            go.run(instantiatedModule.instance, [eventData, startNonce, endNonce])

            // Send back result message to main thread
            self.postMessage({
                eventType: "RESULT",
                eventData: lastresult,
            });
        });
    }
 
}, false);

