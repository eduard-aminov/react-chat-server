const { Router } = require('express')
const router = Router()

const Dialog = require('../models/Dialog')
const Message = require('../models/Message')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const dialogId = req.query.dialog_id
        await Dialog.findById(dialogId, (err, dialog) => {
            if (err) {
                return res.status(404).json({
                    message: 'Dialog not found'
                })
            }
            res.json(dialog)
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.get('/messages/', auth, async (req, res) => {
    try {
        const dialogId = req.query.dialog_id
        // const userId = req.user.userId
        await Message
            .find({dialog: dialogId})
            .populate(['dialog'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found'
                    })
                }
                return res.json(messages)
            })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/create', auth, (req, res) => {
    try {
        const postData = {
            author: req.user.userId,
            partner: req.body.partner
        }

        const dialog = new Dialog(postData)

        dialog.save()
            .then(obj => {
                res.json(obj)

                const message = new Message({
                    dialog: dialog._id,
                    text: req.body.text,
                    user: req.user.userId
                })

                message.save()
                    .then(obj => {
                        res.json(obj)
                    })
                    .catch(reason => {
                        res.json(reason)
                    })
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
        const dialogId = req.query.dialog_id
        await Dialog.findByIdAndDelete(dialogId, (err, dialog) => {
            if (err) {
                return res.status(404).json({
                    message: 'Dialog not found'
                })
            }
            res.json({
                message: `Dialog was delete`
            })
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router