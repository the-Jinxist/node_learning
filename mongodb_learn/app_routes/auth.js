const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/register', async (request, response) => {
   
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

    try{
        const savedUser = await user.save();
        response.send(savedUser.toString());
    }catch(e){
        console.log(e.toString());
        response.status(400).send(e);
    }
})

module.exports = router;