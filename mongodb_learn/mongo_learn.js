const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const app = express();    

//Allows for easy parsing of request bodies.
app.use(express.json());

//Import routes
const postRoutes = require('./app_routes/posts');

//Middlewares in Express: A function that execute when we hit a particular route
app.use('/posts', postRoutes);

//Favour, always remember to keep the .env file in the same folder with the file
//..you're using it in
MongoClient.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true}, (error, client) => {
    if(error){
        console.log(`Error occurred while connecting to mongo db, ${error}`);
        return;
    }

    console.log('We are in the congo now boys!');

    const db = client.db('neodb');
    const neosCollection = db.collection('neoscollection')

});


//We have to start listening to a server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
