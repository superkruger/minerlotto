
// Polyfill instantiateStreaming for browsers missing it
if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const source = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(source, importObject);
    };
}

let lastresult

function HashResult(solved, nonce) {
  console.log("HashResult is", solved, nonce)

  lastresult['solved'] = solved
  lastresult['nonce'] = nonce
}
 
// Handle incoming messages
self.addEventListener('message', function(event) {
 
    const { eventType, eventData, eventId, hashResult } = event.data;

    lastresult = hashResult

    importScripts('./wasm_exec.js');
    const go = new Go();
    
    if (eventType === "CALL") {

        WebAssembly.instantiateStreaming(fetch("./hash.wasm"), go.importObject).then(async (instantiatedModule) => {

            self.postMessage({
                eventType: "BUSY",
            });

            go.run(instantiatedModule.instance, [eventData])

            // Send back result message to main thread
            self.postMessage({
                eventType: "RESULT",
                eventData: lastresult,
            });
        });
    }
 
}, false);

