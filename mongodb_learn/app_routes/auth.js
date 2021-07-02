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

        //29:18

    const validation = validate(request.body);
    if(validation.error){
        console.log(validation.error.details);
        response.status(400).json({
            message: validation.error.details[0].message
        });
        return;
    }

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
})

module.exports = router;