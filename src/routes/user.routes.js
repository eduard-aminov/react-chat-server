const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const Dialog = require('../models/Dialog')

router.get('/', async (req, res) => {
    try {
        const userId = req.query.user_id
        await User.findById(userId, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            res.json(user)
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.delete('/', async (req, res) => {
    try {
        const userId = req.query.user_id
        await User.findByIdAndDelete(userId, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            res.json({
                message: `User ${user.username} was delete`
            })
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.get('/dialogs/', async (req, res) => {
    try {
        const authorId = req.query.author_id
        await Dialog.find({author: authorId})
            .populate(['author', 'partner'])
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    })
                }
                return res.json(dialogs)
            })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router