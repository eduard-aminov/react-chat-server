const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const Dialog = require('../models/Dialog')

const auth = require('../middlewares/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const userId = req.query.user_id
        await User.findById(userId, (err, user) => {
            if (err) {
                return res.status(404).json({
                    error: {
                        code: 20,
                        message: 'User not found'
                    }
                })
            }
            res.json(user)
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
})

router.delete('/', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        await User.findByIdAndDelete(userId, (err, user) => {
            if (err) {
                return res.status(404).json({
                    error: {
                        code: 20,
                        message: 'User not found'
                    }
                })
            }
            res.json({
                message: `User ${user.username} was delete`
            })
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
})

router.get('/dialogs/', auth, async (req, res) => {
    try {
        const authorId = req.user.userId
        await Dialog.find({author: authorId})
            .populate(['author', 'partner'])
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        error: {
                            code: 31,
                            message: 'Dialogs not found'
                        }
                    })
                }
                return res.json(dialogs)
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
})

module.exports = router