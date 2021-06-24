const express = require('express');
const mongoose = require('mongoose');

//We'll be creating a schema. This represents how a post looks
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    other: {
        type: String,
        required: true
    }
});

const NewPosts = mongoose.model('NewPosts', PostSchema);

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
    
    const newModel = new NewPosts({
        title: request.body.title,
        description: request.body.description,
        other: "Other stuff"
    });

    newModel
        .save()
        .then( data => {
            console.log(data);
            response.status(200).json({
                success: data
            });
        })
        .catch(error => {
            console.log(error);
            response.status(400).json({
                failure: error
            });
        });

});

module.exports = router;