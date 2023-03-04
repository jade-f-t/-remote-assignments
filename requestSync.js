const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";

function requestSync(url) {
    // write code to request url synchronously
    const start = Date.now();
    const XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', url , false); 
    xhr.send(null);
    
    return console.log(xhr.responseText,Date.now() - start);
   
}


const isAsync = requestSync.constructor.name === "AsyncFunction";
console.log(isAsync)
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)


