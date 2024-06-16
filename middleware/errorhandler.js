const { isExists } = require('date-fns');
const {} = require('../constants');

//Middle ware
const errorhandler = (err,req,res,next) => {
    // res.json({title: "ERROR CAUGHT", message : err.message, stackTrace : err.stack});
    if(res.statusCode) {
        statusCode = res.statusCode;
    } else {
        statusCode = 500;
    }
    switch (statusCode) {
        case 400:
            res.json( { 
                title : "Validation Failed" ,
                message : err.message,
                stackTrace : err.stack
            } );
        case 401:
            res.json( { 
                title : "UNAUTHORIZED" ,
                message : err.message,
                stackTrace : err.stack
            } );
        case 403:
            res.json( { 
                title : "FORBIDDEN" ,
                message : err.message,
                stackTrace : err.stack
            } );
        case 404:
            res.json( { 
                title : "Not Found" ,
                message : err.message,
                stackTrace : err.stack
            } );
        default:
            break;
    };
    next();
}

module.exports = errorhandler;