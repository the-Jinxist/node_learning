const express = require('express');

//Using a router to cleanly separate app logic into separate files
const router = express.Router();

router.get('/posts', (request, response) => {
    response.send('We are still on posts, sadly');
});

module.exports = router;