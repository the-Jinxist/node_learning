const express = require('express');
const router = express.Router();

router.post('/register', async (request, response) => {
    response.send('Omo, so quickly!');
})

module.exports = router;