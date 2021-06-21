const http = require('http');

//Here we're creating a web server
//This server is also an event emitter
const server = http.createServer();

server.on('connection', (socket) => {
    console.log('New connection', socket)
});

server.listen(3000);

console.log('Listening on port 3000');