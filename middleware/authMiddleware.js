const jwt = require('jsonwebtoken');
const User = require('../models/userAuthModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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

const requireRole = (roles) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, jwtSecret, async (err, decodedToken) => {
                if (err) {
                    console.log('Token verification failed');
                    res.redirect('/api/v1/login')
                }
                else {
                    try {
                        const user = await User.findById(decodedToken.id);
                        if (user && roles.includes(user.role)) {
                            req.user = user;
                            next()
                        } else {
                            res.status(403).json({
                                status: 'failed',
                                message: 'Permission denied'
                            })
                        }
                    } catch (error) {
                        console.error(error);
                        res.status(500).send('Internal server Error')

                    }
                }
            });
        }
        else {
            console.log('No Token found');

            res.redirect('/api/v1/login')
        }
    };
};


module.exports = { requireAuth, checkUser, requireRole };