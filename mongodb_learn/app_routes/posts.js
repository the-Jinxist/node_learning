const express = require('express');
const PostsModel = require('../models/Post');

//Using a router to cleanly separate app logic into separate files
const router = express.Router();

//Importing the model we want to post to
require('../models/Post');

//We can replace '/posts' with '/' because we have specified the route that will
//..will be used in @mongo_learn.js

//Returns all the posts in the database
router.get('/',  async (request, response) => {
    try{
        const posts = await PostsModel.find();
        response.status(200).json(posts);
    }catch(error){
        console.log(error);
            response.status(400).json({
                failure: error
            });
    }
});

//Returns a specific post via the id in the params
router.get('/:id', async (request, response) => {
    try{
        const post = await PostsModel.findById(request.params.id);
        response.status(200).json(post);
    }catch(error){
        response.status(400).json({
            failure: error
        });
    }
    
});

//Deletes a specific post
router.delete('/:id', async (request, response) => {
    try{
        //Used ' _id ' here because mongo db automatically generates the field for us
        const removedPost = await PostsModel.remove({ _id: request.params.id });
        response.status(200).json({
            message: "You have successfully removed this post",
            post: removedPost
        });
    }catch(error){
        response.status(400).json({
            failure: error
        });
    }
});

//Updating a particular document in de database
router.patch('/:id', async (request, response) => {
    try{
        const updatedPost = 
            await PostsModel.updateOne(
                { _id: request.params.id}, 
                { $set: {title: request.body.title}}
            );

        response.status(200).json({
            message: "You have successfully updated this post",
            post: updatedPost
        });
        
    }catch(error){
        response.status(400).json({
            failure: error
        });
    }
});

router.post('/', async (request, response) => {
    
    const newModel = new PostsModel({
        title: request.body.title,
        description: request.body.description,
    });

    
    try{
        const savedModel = await newModel.save();
        
        console.log(savedModel);
        response.status(200).json({
            success: savedModel
        });

    }catch(error){
        console.log(error);
            response.status(400).json({
                failure: error
            });
    }

});

module.exports = router;