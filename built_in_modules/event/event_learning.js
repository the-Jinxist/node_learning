const EventEmitter = require('events');
const emitter = new EventEmitter();

//Registering a listener
emitter.on('messageLogged', function(){
    console.log('Gotten message!');
});


//Signalling that an event has happened
emitter.emit('messageLogged');