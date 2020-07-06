const { check, validationResult} = require('express-validator')

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({ errors: errors.array() })
    }
}

const validator = {
    email() {
        return validate([check('email', 'Invalid email').normalizeEmail().isEmail()])
    },
    username() {
        return validate([check('username', 'Username cannot be empty').exists()])
    },
    password() {
        return validate([check('password', 'Password cannot be empty').exists()])
    },
    login() {
        return [this.username(), this.password()]
    }
}

module.exports = validator