const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Joi = require('joi');
const { SchemaType } = require('mongoose');
const { validateSignUpRequest, validateLoginRequest } = require('../models/validation');


router.post('/register', async (request, response) => {
   
    try{

    //Validating the data collected from the user
    const validation = validateSignUpRequest(request.body);
    if(validation.error){
        console.log(validation.error.details);
        response.status(400).json({
            message: validation.error.details[0].message
        });
        return;
    }

    //Checking if the user is already in the database
    const emailExists = User.findOne({email: request.body.email});
    if(emailExists){
        response.status(400).json({
            status: 400,
            message: `A user with the email ${request.body.email} already exists`
        }); 

        return;
    }

    //Creating a new user
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

        const savedUser = await user.save();
        response.status(200).json({
            status: 200,
            message: "Sign Up Successful!",
            data: savedUser
        });
    }catch(e){
        console.log(e.toString());
        response.status(400).json({
            status: 400,
            message: e.toString()
        });
    }
});

module.exports = router;