const jwt = require('jsonwebtoken');
const User = require('../models/userAuthModel');

// Handle errors
const handleErrors = err => {
    console.log(err.message, err.code);
    let errorObj = { email: '', password: '' }

    // incorrect email
    if (err.message === 'incorrect email') {
        errorObj.email = "The email is not registered"
    }
    // incorrect email
    if (err.password === 'incorrect password') {
        errorObj.email = "The passowrd is incorrect"
    }

    // duplicate error code
    if (err.code == 11000) {
        errorObj.email = "The email has already been registered";
        return errorObj;
    }


    //validation erros
    if (err.message.includes('AuthModel validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errorObj[properties.path] = properties.message;
        })

    }
    return errorObj;
}

// Creating jwt token
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRES_IN;
const createToken = id => {
    return jwt.sign({ id }, secret, { expiresIn: expires })
}

exports.getHomepage = async (req, res, next) => {
    res.render('home')
}

exports.getSmoothies = async (req, res, next) => {
    res.render('smoothies')
}

exports.getSignup = async (req, res, next) => {
    res.render('signup');
}
exports.getLogin = async (req, res, next) => {
    res.render('login');
}
exports.postSignup = async (req, res, next) => {
    try {
        // Check if the user already exists based on email or username
        const findUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        // If the user exists, send an error response and stop further execution
        if (findUser) {
            return res.status(400).json({
                status: "failed",
                message: 'This user already exists'
            });
        }

        // Create a new user since no duplicates were found
        const newUser = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });


        // Hide the password field before sending the response
        newUser.password = undefined;


        // Send success response
        return res.status(201).json({
            status: 'Success',
            data: {
                newUser: newUser._id
            }
        });
    } catch (err) {
        // Error handling with a proper message
        const errors = handleErrors(err)
        res.status(400).json({
            status: 'Failed',
            errors
        });
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('Email and Password:', email, password); // Debug log to see incoming values

    try {
        const user = await User.login(email, password); // Call the login method from the model

        const token = createToken(user._id);
        const maxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie('jwt', token, { httpOnly: true, maxAge });

        res.status(200).json({
            status: 'Success',
            data: {
                user: user._id,
            },
        });
    } catch (err) {
        console.error('Error:', err); // Debug log to see the error
        const errors = handleErrors(err) || { message: err.message }; // Ensure error handling doesn't fail
        res.status(400).json({
            status: 'failed',
            errors,
        });
    }
};


exports.getLogout = async (req, res, next) => {
    // cant delete the token from the server so we ll replace the token with empty string
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/api/v1/')
}