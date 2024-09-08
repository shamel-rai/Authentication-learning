const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'A email is required to signup'],
        unique: true,
        lowecase: true,
        validate: [validator.isEmail, "Invalid email, Please provide us with a valid email"]
    },
    password: { type: String, required: true, minlength: [8, "A password must have a min length of 8 character"], select: false },
    role: {
        type: String,
        enum: ['user', 'admin', 'recipe-guide'],
        default: 'user', 
        require: true
    }
    //     passwordConfirm: {
    //         type: String, required: true, minlength: 8,
    //         validator: function (val) {
    //             return val == this.password
    //         },
    //         message: 'This password does not match'
    //     },
    //     role: { type: String, required: true }
})

authSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// Static method to login user
authSchema.statics.login = async function (email, password) {
    // console.log(email, password)
    const user = await this.findOne({ email }).select('+password');

    console.log(user)
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};

const AuthModel = mongoose.model('AuthModel', authSchema);

module.exports = AuthModel;