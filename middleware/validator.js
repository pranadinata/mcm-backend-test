const { check, validationResult } = require('express-validator');

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        console.log(errorMessages)
        return res.status(400).json({
            errors: errorMessages
        });
    } 
    next();
}

const login_check = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),  
    reporter
]

module.exports = {
    login_check
};