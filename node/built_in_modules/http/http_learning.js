const http = require('http');

//Here we're creating a web server
//This server is also an event emitter

//Now we're using callbacks, instead of the on method
const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.write('Hello World');
        res.end();
    }

    //Incase of a particular path or endpoint
    if(req.url == '/api/courses'){
        res.write(JSON.stringify([1,2,3,4,5,6]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000');