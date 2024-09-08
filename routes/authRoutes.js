const express = require('express');
const { requireAuth, checkUser, requireRole } = require('../middleware/authMiddleware');
const { getSignup, getLogin, postSignup, postLogin, getHomepage, getSmoothies, getLogout } = require('../controller/userController');

const router = express.Router();

// Define routes
router.get('*', checkUser)


router.get('/', getHomepage);
router.get('/smoothies', requireRole('user', 'admin'), requireAuth, getSmoothies);
router.route('/signup')
    .get(getSignup)
    .post(postSignup);
router.route('/login')
    .get(getLogin)
    .post(postLogin);

router.route('/logout').get(getLogout)

module.exports = router;
