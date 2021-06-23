const express = require('express');
const PostsModel = require('../models/Post');

//Using a router to cleanly separate app logic into separate files
const router = express.Router();

//Importing the model we want to post to
require('../models/Post');

//We can replace '/posts' with '/' because we have specified the route that will
//..will be used in @mongo_learn.js
router.get('/', (request, response) => {
    response.send('We are still on posts in a new route, sadly');
});

router.get('/specific', (request, response) => {
    response.send('Here is your specific post, ooh rah!');
});

router.post('/', (request, response) => {
    
    const post = new PostsModel({
        title: request.body.title,
        description: request.body.description
    });

    
    post.save().then(data => {
            response.json(data);
        })
        .catch( error => {
            response
                .status(401)
                .json({
                    message: error
                });
        });

});

module.exports = router;