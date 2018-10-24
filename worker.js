

let task = "idle";
var bc = new BroadcastChannel('worker_channel');
bc.postMessage("worker_ready");

bc.onmessage = (event) => {
    task = event.data;
    console.log(task);
}

function httpRequest(source) {
    let http = new XMLHttpRequest();

    http.open("GET", source);
    http.send();

    http.onreadystatechange = () => {
        if(http.readyState == XMLHttpRequest.DONE) {
            postMessage(JSON.parse(http.response));
        }
    };
}