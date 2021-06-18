const file  = require('fs');

//All methods in the file module are in two forms:
// 1. Synchronous
// 2. Asynchronous
const files = file.readdirSync('./');
console.log(files);

//All asynchronous take a function as their last argument, a callback(Java says Hi!)
file.readdir('./', function(err, files){

    //Only one of these values will not be null, brilliant state management!
    if(err) console.log('Error', err);
    else console.log('Result', files);

})