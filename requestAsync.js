const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";


function requestCallback(url, callback) {
 // write code to request url asynchronously
    const start = Date.now();

    const XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();


    xhr.open('GET', url); 
    xhr.send(null);

    xhr.addEventListener('loadend', (event) => {console.log(`loadend -- responseText: ${xhr.responseText} -- executionTime: ${Date.now() - start}`) });

    return callback(Date.now() - start) ;

}

function requestPromise(url) {
    const start = Date.now();
 // write code to request url asynchronously with Promise
    return new Promise((resolve,reject)=>{
        
        const XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
        const xhr = new XMLHttpRequest();


        xhr.open('GET', url ); 
        xhr.send(null);

        xhr.addEventListener('loadend', (event) => {console.log(`loadend -- responseText: ${xhr.responseText} -- executionTime: ${Date.now() - start}`) });
        resolve( Date.now() - start );
        
    });

}

async function requestAsyncAwait(url) {
 // write code to request url asynchronously
 // you should call requestPromise here and get the result using async/await.
    const start = Date.now();
    const result = await requestPromise(url);

    return console.log(result)
}



requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);

