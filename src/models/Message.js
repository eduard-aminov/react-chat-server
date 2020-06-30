const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
    text: {
        type: String,
        required: 'Text is required',
    },
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: 'Dialog id is required'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User id is required',
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = model('Message', MessageSchema)