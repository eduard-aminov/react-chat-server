const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const authController = {
    async register(req, res) {
        try {
            const {
                email,
                firstName,
                lastName,
                username,
                password
            } = req.body

            const candidate = await User.findOne({username, email})
            if (candidate) {
                return res.status(400).json({
                    error: {
                        code: 20,
                        message: 'User exist'
                    }
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12).then(hash => (hash))
            const user = new User({email, firstName, lastName, username, password: hashedPassword})

            await user.save( (err, user) => {
                if (err) {
                    console.log('User saving Error:', err)
                    return res.status(500).json({
                        error:{
                            code: 21,
                            message: 'Cannot save user'
                        }
                    })
                }
                return res.json(user)
            })

        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                error: {
                    code: 1,
                    message: 'Something went wrong'
                }
            })
        }
    },
    async login(req, res) {
        try {
            const { username, password} = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({
                    error: {
                        code: 22,
                        message: 'User does not exist'
                    }
                })
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return res.status(400).json({
                    error: {
                        code: 12,
                        message: 'Invalid authorization data'
                    } })
            }

            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '7 days'}
            )

            return res.json({ token, userId: user.id })

        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                error: {
                    code: 1,
                    message: 'Something went wrong'
                }
            })
        }
    }
}

module.exports = authController