const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validateToken = expressAsyncHandler( async(req, res, next) => {
    let token;
    let authHead = req.headers.Authorization || req.headers.authorization;
    if(authHead && authHead.startsWith("Bearer")) {
        token = authHead.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE, (err,decoded) => {
            if(err) {
                res.status(401);
                throw new Error("User is Not Authorized");
            }
            req.users = decoded.users;
            /*IMPORTANT NOTE : TO BE RETURNED USER AS A REQUEST FORMAT*/
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("Token Not Verified/Found");
        }
    }
})

module.exports = validateToken;