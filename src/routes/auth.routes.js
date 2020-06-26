const { Router } = require('express')
const router = Router()

const User = require('../models/User')

router.post('/register', (req, res) => {
    try {
        const postData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        const user = new User(postData)

        user.save()
            .then(obj => {
                res.json(obj)
            })
            .catch(reason => {
                res.json(reason)
            })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/login', async (req, res) => {
    try {

    } catch (e) {

    }
})

module.exports = router