const express = require('express');

const User = require('../models/User');
const { validateSignUpRequest, validateLoginRequest } = require('../models/validation');
const bcrypt = require('bcryptjs');

const router = express.Router();

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
    const emailExists = await User.findOne({email: request.body.email});
    if(emailExists){
        response.status(400).json({
            status: 400,
            message: `A user with the email ${request.body.email} already exists`
        }); 

        return;
    }

    //Hash the password
    //10 describes the complexity of the encoder of the password
    const salt = await bcrypt.genSalt(10);

    //The salt combines with the password to create a mumble of string that
    //..only bcrypt can decrypt. Ooh rah!
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    //Creating a new user
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
    })

        const savedUser = await user.save();
        response.status(200).json({
            status: 200,
            message: "Sign Up Successful!",
            data: {
                id: savedUser.id,
                email: savedUser.email
            }
        });
    }catch(e){
        console.log(e.toString());
        response.status(400).json({
            status: 400,
            message: e.toString()
        });
    }
});

router.post('/login', async (request, response) => {

    try{
        const validation = validateLoginRequest(request.body);
        if(validation.error){
            console.log(validation.error.details);
            response.status(400).json({
                message: validation.error.details[0].message
            });
            return; 
        }
        
        const savedUser = await User.findOne({email: request.body.email})
        if(savedUser){
            const validPass = await bcrypt.compare(request.body.password, savedUser.password);
            if(validPass){
                response.status(200).json({
                    status: 200,
                    message: "Log in Successful!",
                    data: {
                        id: savedUser.id,
                        email: savedUser.email
                    }
                });

                return;
            }else{
                
                response.status(400).json({
                    message: 'Email or Password is incorrect'
                });

                return;
            }
            
        }else{
            response.status(400).json({
                message: 'Email or Password is incorrect'
            });
            return;
        }

    }catch(e){
        console.log(e.toString());
        response.status(400).json({
            status: 400,
            message: e.toString()
        });
    }
    

});

module.exports = router;