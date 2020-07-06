const Dialog = require('../models/Dialog')
const Message = require('../models/Message')
const errors = require('../utils/errors')

const dialogController = {

    async getDialog(req, res) {
        try {
            const dialogId = req.query.dialog
            await Dialog.findById(dialogId, (err, dialog) => {
                if (err) {
                    errors.dialogNotFound(res)
                }
                res.json(dialog)
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async getDialogMessages(req, res) {
        try {
            const dialogId = req.query.dialog
            await Message
                .find({dialog: dialogId})
                .populate(['dialog'])
                .exec((err, messages) => {
                    if (err) {
                        errors.messagesNotFound(res)
                    }
                    return res.json(messages)
                })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    createDialog(req, res) {
        try {
            const io = req.app.get('io')

            const postData = {
                author: req.user.userId,
                partner: req.body.partner,
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
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async deleteDialog(req, res) {
        try {
            const dialogId = req.query.dialog
            await Dialog.findByIdAndDelete(dialogId, (err) => {
                if (err) {
                    errors.dialogNotFound(res)
                }
                res.json({
                    message: `Dialog was delete`
                })
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    }
}

module.exports = dialogController