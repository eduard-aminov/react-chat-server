const { Router } = require('express')
const router = Router()

const Message = require('../models/Message')

const auth = require('../middlewares/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const messageId = req.query.message_id
        await Message.findById(messageId, (err, message) => {
            if (err) {
                return res.status(404).json({
                    message: 'Message not found'
                })
            }
            res.json(message)
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/create', auth, (req, res) => {
    try {
        const dialogId = req.query.dialog_id

        const postData = {
            user: req.user.userId,
            text: req.body.text,
            dialog: dialogId
        }

        const message = new Message(postData)

        message.save()
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

router.delete('/', auth, async (req, res) => {
    try {
        const messageId = req.query.message_id
        await Message.findByIdAndDelete(messageId, (err, message) => {
            if (err) {
                return res.status(404).json({
                    message: 'Message not found'
                })
            }
            res.json({
                message: `Message was delete`
            })
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router