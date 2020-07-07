const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
const errors = require('../utils/errors')

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
            if (candidate) errors.userExist(res)

            const hashedPassword = await bcrypt.hash(password, 12).then(hash => hash)
            const user = new User({email, firstName, lastName, username, password: hashedPassword})

            await user.save((err, user) => {
                if (err) {
                    console.log(err.message)
                    errors.cannotSaveUser(res)
                }
                return res.json(user)
            })

        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async login(req, res) {
        try {
            const { username, password} = req.body

            const user = await User.findOne({ username })
            if (!user) errors.userDoesNotExist(res)

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) errors.invalidAuthData(res)

            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '7 days'}
            )

            return res.json({ token, userId: user.id })

        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    }
}

module.exports = authController