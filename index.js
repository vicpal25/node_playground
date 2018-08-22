process.env.UV_THREADPOOL_SIZE=1;

const cluster = require('cluster');
const crypto = require('crypto');
const Worker = require('worker-threads').Worker;

function doWork(duration) {
    const start = Date.now();   
    while(Date.now() - start < duration) {}
}


// CLUSTERING EXAMPLES

// if(cluster.isMaster) {

//     cluster.fork();
//     cluster.fork();



// } else {

//     const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//         res.send('Hi there');
// });
  
// });

// app.get('/fast', (req, res) => {
//     res.send('This was fast');
// });



// app.listen(3000);

// }


// WEB WORKER TESTS


const express = require('express');
const app = express();

app.get('/', (req, res) => {
   const a = 1;
   const worker = new Worker(function() {
       this.onmessage = function() {

        let counter = 0;

        while (counter < 1e9) {
            counter++;
        }

        postMessage(counter);

       }
      
   })

   worker.onmessage = function(myCounter) {
        console.log(myCounter);
   }

   worker.postMessage();
  
});

app.get('/fast', (req, res) => {
    res.send('This was fast');
});



app.listen(3000);

