const User = require('../models/User')
const Dialog = require('../models/Dialog')
const errors = require('../utils/errors')

const userController = {
    async getUser(req, res) {
        try {
            const userId = req.query.user || req.user.userId
            await User.findById(userId, (err, user) => {
                if (err) {
                    errors.userNotFound(res)
                }
                res.json(user)
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.user.userId
            await User.findByIdAndDelete(userId, (err, user) => {
                if (err) {
                    errors.userNotFound(res)
                }
                res.json({
                    message: `User ${user.username} was delete`
                })
            })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    },

    async getUserDialogs(req, res) {
        try {
            const authorId = req.user.userId
            await Dialog.find({author: authorId})
                .populate(['author', 'partner'])
                .exec((err, dialogs) => {
                    if (err) {
                        errors.dialogsNotFound(res)
                    }
                    return res.json(dialogs)
                })
        } catch (e) {
            console.log(e.message)
            errors.somethingWentWrong(res)
        }
    }
}

module.exports = userController