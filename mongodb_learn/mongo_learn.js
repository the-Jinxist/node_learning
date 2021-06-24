const express = require('express');
//Used mongoose itself to connect with the mongodb database and removed '&w=majority' from the end of the 
//..db URI
const mongoose = require('mongoose');
require('dotenv/config');

//To allow domains to be able to access your APIs, we have to use the CORS middleware
const cors = require('cors');

const app = express();    

//Allows for easy parsing of request bodies.
app.use(express.json());
app.use(cors());

//Import routes
const postRoutes = require('./app_routes/posts');

//Middlewares in Express: A function that execute when we hit a particular route
app.use('/posts', postRoutes);

//Favour, always remember to keep the .env file in the same folder with the file
//..you're using it in
mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    .then( value => {
        console.log("We in the mongo boys!");
    })
    .catch(error => {
        console.log(error);
    });


//We have to start listening to a server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
