const express = require('express');

//Using a router to cleanly separate app logic into separate files
const router = express.Router();

//We can replace '/posts' with '/' because we have specified the route that will
//..will be used in @mongo_learn.js
router.get('/', (request, response) => {
    response.send('We are still on posts in a new route, sadly');
});

router.get('/specific', (request, response) => {
    response.send('Here is your specific post, ooh rah!');
});

module.exports = router;