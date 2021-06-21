const express = require('express');
const app = express();


app.get(
/* Endpoint/Path: Home page of the website */
'/',
/* This call back is called when the endpoint is accessed */ 
(request, response) => {
    
    //Sending back a response
    response.send('Hello World!!!');
});

app.get('/api/courses',(request, response) => {
    response.send([1, 2, 3, 4, 5, 6]);
});

app.get('/api/courses/:id', (request, response) => {
    response.send(request.params.id);
});

// 3000 is an arbitrary number and since hosting site assign their own ports,
//.. we can rely on 3000 to be available. So we have to use an environment variable
// Usually in hosting applications we have this environment variable called PORT

//We use the global process object for reading this PORT variable

//This is the proper way to assign the port variable for your server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));