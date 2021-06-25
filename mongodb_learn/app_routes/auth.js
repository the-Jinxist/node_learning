const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Joi = require('joi');
const { SchemaType } = require('mongoose');

//validate the request
function validate(request){
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(3)
                .max(255),
        email: Joi.string()
                    .required()
                    .max(255)
                    .min(6),
        password: Joi.string()
                     .required()
                     .min(8)
                     .max(1024)
    });

    return schema.validate(request);
}

router.post('/register', async (request, response) => {
   
    

    try{

    const validation = validate(request.body);
    if(validation.error){
        console.log(validation.error.details);
        response.status(400).json({
            message: validation.error.details
        });
        return;
    }

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

        const savedUser = await user.save();
        response.send(savedUser.toString());
    }catch(e){
        console.log(e.toString());
        response.status(400).send(e);
    }
})

module.exports = router;