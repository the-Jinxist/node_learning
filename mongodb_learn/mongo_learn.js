const express = require('express');
const app = express();

//Allows for easy parsing of request bodies.
app.use(express.json());

//Middlewares in Express: A function that execute when we hit a particular route
app.use('/posts', () => {
    console.log('This is a middle ware running');
});



//We have to start listening to a server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
