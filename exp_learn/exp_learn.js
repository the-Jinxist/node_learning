const express = require('express');
const app = express();


app.get(
/* Endpoint/Path: Home page of the website */'/',
/* This call back is called when the endpoint is accessed */ 
(request, response) => {
    
    //Sending back a response
    response.send('Hello World!!!');
});

app.get('/api/courses',(request, response) => {
    response.send([1, 2, 3, 4, 5, 6]);
});

// 3000 is an arbitrary number and since hosting site assign their own ports,
//.. we can rely on 3000 to be available. So we have to use an environment variable
// Usually in hosting applications we have this environment variable called PORT

//We use the global process object for reading this PORT variable
app.listen(3000, () => console.log('Listening on port 3000'));