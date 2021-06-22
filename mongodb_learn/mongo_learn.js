const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

//Omo, you must encode the special characters in your connection string 
//..before you use it o. Encoded '#' as '%23'
const connectionString = 
    'mongodb+srv://neo_dev:<goodness11%23>@neo-mongo.fhr3f.mongodb.net/neodb?retryWrites=true&w=majority'

//Allows for easy parsing of request bodies.
app.use(express.json());

//Middlewares in Express: A function that execute when we hit a particular route
app.use('/posts', () => {
    console.log('This is a middle ware running');
});

MongoClient.connect(connectionString, (error, client) => {
    if(error){
        console.log(`Error occurred while connecting to mongo db, ${error}`);
        return;
    }

    const db = client.db('neodb');
    const neosCollection = db.collection('neoscollection')

});


//We have to start listening to a server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
