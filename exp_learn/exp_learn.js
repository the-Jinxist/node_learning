const express = require('express');
const Joi = require('joi');
const app = express();

//This is a middleware code that allows express to properly parse
//them JSON objects
app.use(express.json());

const courses = [
    {
        id: 1, 
        name: 'Course1'
    },
    {
        id: 2, 
        name: 'Course2'
    },
    {
        id: 3, 
        name: 'Course3'
    },

];

app.get(
/* Endpoint/Path: Home page of the website */
'/',
/* This call back is called when the endpoint is accessed */ 
(request, response) => {
    
    //Sending back a response
    response.send('Hello World!!!');
});

app.get('/api/courses',(request, response) => {
    response.send(JSON.stringify(courses));
});

//Getting path/route and query string variables

app.get('/api/courses/:id/:stuff', (request, response) => {

    //Path/Route variables are used for required values
    // response.send(request.params);

    //Query strings are used for optional values
    response.send(request.query);
});

//Retrieving a particular course that matches the same id
app.get('/api/courses/:id/', (request, response) => { 
    const course = courses.find( (value) => value.id === parseInt(request.params.id));
    if(!course){
        //This means course is null/doesn't exists and we should return a 404 yay!
        response.status(404).send('The response with the given ID was not found');
    }else{
        response.send(course);
    }
    
});

//Responding to POST requests
app.post('/api/courses', (request, response) => {

    //Used Joi for input validation, shit is quite a lifesaver, 
    //.. Why don't we have something like this in mobile, cheeeee!


    const {error} = validateCourse(request.body);
    if(error){
        response.status(400).send(error.details[0].message);
        return;   
    }

    const course = {
        id: courses.length + 1,
        //In order for the line below to work, we need to enable parsing of the JSON objects in 
        //..in the body of the request
        name: request.body.name
    };

    courses.push(course);
    response.send(course);

});

//Handling PUT requests
app.put('/api/courses/:id', (request, response) => {
    //Look up the course with the given id
    //If course doesn't exist, return 404

    //Validate
    //if invalid, return 400 - Bad Request

    //Update course
    //Return the update course to the client

    const course = courses.find( (value) => value.id === parseInt(request.params.id));
    if(!course){
        //This means course is null/doesn't exist and we should return a 404 yay!
        response.status(404).send('The response with the given ID was not found');
        return;
    }

    //This object destructuring, getting the individual values from an object 
    const {error} = validateCourse(request.body);
    if(error){
        response.status(400).send(error.details[0].message);  
        return;
    }

    course.name = request.body.name;
    response.send(course);


});

//Handling DELETE requests
app.delete('/api/courses/:id', (request, response) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find( (value) => value.id === parseInt(request.params.id));
    if(!course){
        //This means course is null/doesn't exist and we should return a 404 yay!
        response.status(404).send('The response with the given ID was not found');
        return;
    }
    
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    response.status(201).send(course);
});

function validateCourse(request){
    const schema = Joi.object({
        name: Joi
            .string()
            .min(3)
            .required()
    });

    return schema.validate(request);
}

// 3000 is an arbitrary number and since hosting site assign their own ports,
//.. we can rely on 3000 to be available. So we have to use an environment variable
// Usually in hosting applications we have this environment variable called PORT

//We use the global process object for reading this PORT variable

//This is the proper way to assign the port variable for your server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));