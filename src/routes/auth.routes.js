const { Router } = require('express')
const bcrypt = require('bcrypt')
const { jwt } = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { config } = require('config')
const router = Router()

const User = require('../models/User')

router.post('/register',
    [check('email', 'Invalid email').normalizeEmail().isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid register data'
                })
            }

            const {
                email,
                firstName,
                lastName,
                username,
                password
            } = req.body

            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({ message: 'User exist' })
            }

            const hashedPassword = await bcrypt.hash(password, 12).then(hash => (hash))
            const user = new User({email, firstName, lastName, username, password: hashedPassword})

            await user.save( (err, user) => {
                if (err) {
                    console.log('User saving Error:', err)
                    return res.status(500).json({ message: 'Cannot save user' })
                }
                return res.json(user)
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something went wrong'})
        }
    })

router.post('/login',
    [check('username', 'Username cannot be empty').exists()],
    [check('password', 'Password cannot be empty').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid authorization data'
                })
            }

            const { username, password} = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' })
            }

            const isPasswordMatch = bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return res.status(400).json({ message: 'Authorization data is incorrect' })
            }

            const token = jwt(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '7d'}
            )

            return res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    })

module.exports = router