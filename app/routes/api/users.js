const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const db = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.signup({
            firstName,
            lastName,
            email,
            password,
        });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await db.User.findAll();
    return res.json(users);
}))



module.exports = router;
