const { Router } = require('express')
const router = Router()

const Dialog = require('../models/Dialog')
const Message = require('../models/Message')

router.get('/', async (req, res) => {
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

router.get('/messages/', async (req, res) => {
    try {
        const dialogId = req.query.dialog_id
        await Message.find({dialog: dialogId})
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
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/create', (req, res) => {
    try {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        }

        const dialog = new Dialog(postData)

        dialog.save()
            .then(obj => {
                res.json(obj)

                const message = new Message({
                    dialog: dialog._id,
                    text: req.body.text,
                    user: req.body.author
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

router.delete('/', async (req, res) => {
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