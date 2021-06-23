const express = require('express');

//Using a router to cleanly separate app logic into separate files
const router = express.Router();

//Importing the model we want to post to
const Post = require('../models/Post');

//We can replace '/posts' with '/' because we have specified the route that will
//..will be used in @mongo_learn.js
router.get('/', (request, response) => {
    response.send('We are still on posts in a new route, sadly');
});

router.get('/specific', (request, response) => {
    response.send('Here is your specific post, ooh rah!');
});

router.post('/', (request, response) => {
    response.send(`Bro look at your stuff: ${request.body.title}`)
    console.log(request.body);
});

module.exports = router;