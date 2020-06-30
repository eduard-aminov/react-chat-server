const { Schema, model } = require('mongoose')

const DialogSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Author id is required',
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Partner id is required',
    },
}, {
    timestamps: true
})

module.exports = model('Dialog', DialogSchema)