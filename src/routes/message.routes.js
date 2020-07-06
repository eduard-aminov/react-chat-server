const { Router } = require('express')
const router = Router()

const app = require('../app')
const Message = require('../models/Message')

const auth = require('../middlewares/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const messageId = req.query.message_id
        await Message.findById(messageId, (err, message) => {
            if (err) {
                return res.status(404).json({
                    error: {
                        code: 40,
                        message: 'Message not found'
                    }
                })
            }
            res.json(message)
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

router.post('/create', auth, async (req, res) => {
    try {
        const io = req.app.get('io')

        const dialogId = req.query.dialog_id

        const postData = {
            user: req.user.userId,
            text: req.body.text,
            dialog: dialogId
        }

        try {
            const newMessage = new Message(postData)
            const savedMessage = await newMessage.save()
            const message = await savedMessage
                .populate('dialog', 'partner')
                .execPopulate()
            res.json(message)
            io.emit('SERVER:NEW_MESSAGE', message)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({
                error: {
                    message: e.message
                }
            })
        }
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
        const messageId = req.query.message_id
        await Message.findByIdAndDelete(messageId, (err, message) => {
            if (err) {
                return res.status(404).json({
                    error: {
                        code: 40,
                        message: 'Message not found'
                    }
                })
            }
            res.json({
                message: `Message was delete`
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

module.exports = router