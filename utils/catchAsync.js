// This is will replace all the try catch block this will catch all the errors
module.exports = fn => {
    // using return because dont want to call it when the code is loaded 
    // This will make sure it will only call when express hits it meaning when the user makes the call
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    };
}
