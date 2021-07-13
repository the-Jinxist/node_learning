const jwt = require('jsonwebtoken');

module.exports = function (request, response, next){
    const token = request.header('auth-token');
    if(!token) return response.status(401).json({
        status: 401,
        message: 'Access Denied: This request needs an authenticated token'
    });

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified;
        next();
    }catch(err){
        response.status(400).json({
            status: 400,
            message: `Invalid Token: ${err}`
        });
    }

}