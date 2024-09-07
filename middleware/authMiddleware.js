const jwt = require('jsonwebtoken');
const User = require('../models/userAuthModel')


const jwtSecret = process.env.JWT_SECRET;
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Checks if the json token exists and is verified
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/api/v1/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/api/v1/login');
    }
}
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                try {
                    const user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                } catch (dbErr) {
                    console.error(dbErr);
                    res.locals.user = null;
                }
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };