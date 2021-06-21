const EventEmitter = require('events');
const emitter = new EventEmitter();

//Registering a listener
emitter.on('messageLogged', (arg) => {
    console.log('Gotten message!', arg);
});


//Signalling that an event has happened
emitter.emit('messageLogged', {
    id: 1, url: "monkey"
});