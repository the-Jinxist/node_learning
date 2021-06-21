const express = require('express');
const app = express();


app.get(
/* Endpoint/Path: Home page of the website */'/',
/* This call back is called when the endpoint is accessed */ 
(request, response) => {
    
    //Sending back a response
    response.send('Hello World');
});

app.get('/api/courses',(request, response) => {
    response.send([1, 2, 3, 4, 5, 6]);
});

app.listen(3000, () => console.log('Listening on port 3000'));