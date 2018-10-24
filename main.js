
let data;

let w;
var wbc = new BroadcastChannel('workerBuffer_channel');
var wc = new BroadcastChannel('worker_channel');
var bc_ready = false;
function startWorker() {
    if(typeof(Worker) != "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("worker.js");
        }
        w.onmessage = function(event) {
            if(event.data.stop) {
                stopWorker();
            } else {
                data = event.data;
                console.log(data);
            }
        }
    } else {
        document.getElementById("output").innerHTML = "Error";
    }
    
}

function msg(channel, txt) {
    if(channel == "wbc") {
        wbc.postMessage(txt);
    } else if(channel == "wc") {
        wc.postMessage(txt);
    } else {
        console.log("No such channel");
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}

startWorker();