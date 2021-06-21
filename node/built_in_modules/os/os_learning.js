const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);

//Using a template string
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);