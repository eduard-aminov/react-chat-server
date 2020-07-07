const errors = {
    somethingWentWrong(res) {
        return res.status(500).json({
            error: {
                code: 1,
                message: 'Something went wrong'
            }
        })
    },
    invalidAuthData(res) {
        return res.status(400).json({
            error: {
                code: 12,
                message: 'Invalid authorization data'
            }
        })
    },
    userDoesNotExist(res) {
        return res.status(400).json({
            error: {
                code: 22,
                message: 'User does not exist'
            }
        })
    },
    cannotSaveUser(res) {
        return res.status(500).json({
            error:{
                code: 21,
                message: 'Cannot save user'
            }
        })
    },
    userExist(res) {
        return res.status(400).json({
            error: {
                code: 20,
                message: 'User exist'
            }
        })
    },
    dialogNotFound(res) {
        return res.status(404).json({
            error: {
                code: 31,
                message: 'Dialog not found'
            }
        })
    },
    messageNotFound(res) {
        return res.status(404).json({
            error: {
                code: 40,
                message: 'Message not found'
            }
        })
    },
    messagesNotFound(res) {
        return res.status(404).json({
            error: {
                code: 41,
                message: 'Messages not found'
            }
        })
    }
}

module.exports = errors