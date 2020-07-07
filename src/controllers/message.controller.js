const Message = require('../models/Message')
const errors = require('../utils/errors')

const messageController = {
    async getMessage(req, res) {
        try {
            const messageId = req.query.message
            await Message.findById(messageId, (err, message) => {
                if (err) errors.messageNotFound(res)
                res.json(message)
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async createMessage(req, res) {
        try {
            const io = req.app.get('io')
            const dialogId = req.query.dialog

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
                errors.baseError(res, e)
            }
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async deleteMessage(req, res) {
        try {
            const messageId = req.query.message
            await Message.findByIdAndDelete(messageId, (err) => {
                if (err) errors.messageNotFound(res)
                res.json({
                    message: `Message was delete`
                })
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    }
}

module.exports = messageController